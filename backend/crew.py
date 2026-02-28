from crewai import Agent, Crew, Process, Task, LLM
from crewai.project import CrewBase, agent, crew, task
from crewai.tools import BaseTool
import requests
from bs4 import BeautifulSoup
import os

from playwright.sync_api import sync_playwright

# Custom Tool for scraping maritime sites without OpenAI dependencies
class VesselScraperTool(BaseTool):
    name: str = "VesselScraperTool"
    description: str = "Scrapes maritime websites including SPAs to find vessel technical specifications."

    def _run(self, url: str) -> str:
        # Avoid deadlock by reading local files directly
        if "localhost:8000/static/" in url:
            try:
                filename = url.split("/static/")[-1]
                with open(filename, 'r') as f:
                    content = f.read()
                soup = BeautifulSoup(content, 'html.parser')
                return self._extact_text(soup)[:10000]
            except Exception as e:
                return f"Error reading local file {url}: {str(e)}"

        try:
            with sync_playwright() as p:
                browser = p.chromium.launch(headless=True)
                page = browser.new_page()
                page.goto(url, wait_until="networkidle", timeout=15000)
                
                # Check for login fields
                if page.locator('input[aria-label="Email"]').count() > 0:
                    page.locator('input[aria-label="Email"]').fill('randyfong@aol.com')
                    page.locator('input[aria-label="Password"]').fill('mypgup-zugKu2-xipsyj')
                    page.locator('button:has-text("Login")').click()
                    # Wait for successful login and navigation to /ships
                    page.wait_for_timeout(3000)

                # Ensure the content is fully loaded
                page.wait_for_timeout(2000)
                content = page.content()
                browser.close()
                soup = BeautifulSoup(content, 'html.parser')
                return self._extact_text(soup)[:10000]
        except Exception as e:
            try:
                # Fallback to requests if playwright fails
                response = requests.get(url, timeout=10)
                soup = BeautifulSoup(response.content, 'html.parser')
                return self._extact_text(soup)[:10000]
            except Exception as req_e:
                return f"Error scraping {url}: Playwright error: {str(e)}, Requests error: {str(req_e)}"

    def _extact_text(self, soup):
        # Extract text content while removing script/style elements
        for script in soup(["script", "style"]):
            script.extract()
        text = soup.get_text()
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        return '\n'.join(chunk for chunk in chunks if chunk)

@CrewBase
class ResearchVesselCrew():
    """Research Vessel Discovery & Matching Crew"""
    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'

    def __init__(self) -> None:
        self.gemini_api_key = os.getenv("GEMINI_API_KEY")
        self.llm = LLM(
            model="gemini/gemini-2.5-flash",
            api_key=self.gemini_api_key
        )

    @agent
    def mission_analyst(self) -> Agent:
        return Agent(
            config=self.agents_config['mission_analyst'],
            llm=self.llm,
            verbose=True,
            allow_delegation=False
        )

    @agent
    def vessel_scout(self) -> Agent:
        return Agent(
            config=self.agents_config['vessel_scout'],
            llm=self.llm,
            tools=[VesselScraperTool()],
            verbose=True,
            allow_delegation=False
        )

    @agent
    def matching_coordinator(self) -> Agent:
        return Agent(
            config=self.agents_config['matching_coordinator'],
            llm=self.llm,
            verbose=True,
            allow_delegation=False
        )

    @task
    def analyze_task(self) -> Task:
        return Task(
            config=self.tasks_config['analyze_task'],
            agent=self.mission_analyst()
        )

    @task
    def scout_task(self) -> Task:
        return Task(
            config=self.tasks_config['scout_task'],
            agent=self.vessel_scout()
        )

    @task
    def match_task(self) -> Task:
        return Task(
            config=self.tasks_config['match_task'],
            agent=self.matching_coordinator(),
            context=[self.analyze_task(), self.scout_task()]
        )

    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
            manager_llm=self.llm
        )
