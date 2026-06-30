from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="FinPulse AI Engine API", description="AI and Machine Learning microservice for FinPulse")

class HealthResponse(BaseModel):
    status: str
    message: str

@app.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(status="ok", message="AI Engine is running")

@app.get("/")
async def root():
    return {"message": "Welcome to FinPulse AI Engine"}
