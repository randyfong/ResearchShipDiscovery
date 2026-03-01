# Research Vessel Discovery & Matching Walkthrough

The Research Vessel Discovery & Matching app is a full-stack solution for the Greenwater Foundation to automate the matching of research missions with suitable vessels.

## 🚀 Live Gemini Integration

The application is now fully integrated with a **Live Gemini Backend**. It uses a multi-agent orchestration (CrewAI) to analyze mission statements, scrape maritime registries, and rank matches in real-time.

> [!IMPORTANT]
> **Mock Data Configured**: The system is currently configured to use a local `registry.html` with **100 mock records** for testing purposes, but it can be easily toggled back to live scraping by updating the URL in `backend/config/tasks.yaml`.

## Project Structure

- **Backend**: FastAPI server with a modular **CrewAI** project structure (using `CrewBase`, YAML configs, and a dedicated `crew.py`).
- **Agents**: Mission Analyst, Vessel Scout, and Matching Coordinator powered by **Gemini 2.5 Flash**.
- **Frontend**: Next.js (App Router) with Tailwind CSS and Lucide icons for a premium, responsive UI.

## Features Implemented

### 1. Mission Search Interface
- Intuitive text area for researchers to enter mission statements.
- Modern glassmorphism design with interactive animations.

### 2. Live Agentic Orchestration
- **Modular Configuration**: Agent roles and task descriptions are now organized in `config/agents.yaml` and `config/tasks.yaml`.
- **Dedicated Crew Logic**: Orchestration is handled by a standalone `ResearchVesselCrew` class in `crew.py`.
- **Mission Analyst**: Parses prose into technical requirements using Gemini 2.5 Flash.
- **Vessel Scout**: Scrapes registries using the custom **VesselScraperTool** (bypassing OpenAI dependencies).
- **Matching Coordinator**: Ranks vessels based on proximity, equipment, and timing.

### 3. Results Dashboard
- Clear distinction between **Home Port** and **Operating Region** (Solving the Foundation's "Core Pain").
- Matches include **Confidence Scores** (0-100%) and detailed technical spec summaries.

## How to Run

### Backend Installation
1. Navigate to the `backend` directory.
2. Run the setup script: `./setup.sh` (This creates the virtual environment and installs dependencies).
3. Set your `GEMINI_API_KEY` in `backend/.env`.
4. Run the server: 
   ```bash
   source venv/bin/activate
   python main.py
   ```

### Frontend Installation
1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`.
3. Run the dev server: `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Final Verification Results

The system was verified with a live mission statement:
> "I need a vessel for deep-sea ROV operations in the Pacific for June 2026. Required equipment: A-Frame, ROV Crane, and 4,000m depth capability."

### Vessel Results Dashboard
The agents correctly identified **R/V Sally Ride** and **R/V Falkor (too)** from the live registry as the top matches (95% and 92% confidence respectively).
