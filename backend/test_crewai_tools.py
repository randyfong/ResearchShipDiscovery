from crewai_tools import ScrapeWebsiteTool
tool = ScrapeWebsiteTool(website_url="https://vessels.greenwaterfoundation.org/#/ships")
res = tool.run()
print(res[:500])
