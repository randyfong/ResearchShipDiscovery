from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from crew import ResearchVesselCrew

load_dotenv()

app = FastAPI(title="Research Vessel Discovery & Matching API")

# Serve the static vessel registry for scraping
app.mount("/static", StaticFiles(directory="."), name="static")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MissionRequest(BaseModel):
    mission_statement: str

class VesselMatch(BaseModel):
    name: str
    home_port: str
    operating_region: str
    equipment: List[str]
    confidence_score: int
    operator: str
    description: str

class MissionResponse(BaseModel):
    results: List[VesselMatch]

@app.post("/match", response_model=MissionResponse)
async def match_vessels(request: MissionRequest):
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not found in environment")

    try:
        # Set GOOGLE_API_KEY for potential tool/library use
        os.environ["GOOGLE_API_KEY"] = gemini_api_key
        
        # Initialize and run the modular crew
        result = ResearchVesselCrew().crew().kickoff(inputs={'mission_statement': request.mission_statement})
        
        # Parse the result.raw string for JSON content
        import json
        content = str(result.raw)
        
        # Find the JSON block
        start = content.find('[')
        end = content.rfind(']') + 1
        
        if start != -1 and end != -1:
            try:
                json_str = content[start:end]
                json_data = json.loads(json_str)
                output_results = []
                for item in json_data:
                    output_results.append(VesselMatch(**item))
                return MissionResponse(results=output_results)
            except Exception as parse_err:
                print(f"JSON Parse Error: {parse_err}")
                return MissionResponse(results=[])
        
        return MissionResponse(results=[])

    except Exception as e:
        print(f"Error during agent kickoff: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
