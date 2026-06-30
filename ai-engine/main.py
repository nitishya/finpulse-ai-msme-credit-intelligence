from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="FinPulse AI Engine API", description="AI and Machine Learning microservice for FinPulse")

class HealthResponse(BaseModel):
    status: str
    message: str

class MsmeProfile(BaseModel):
    id: int
    businessName: str
    gstNumber: str
    industry: str
    location: str
    annualRevenue: float
    businessAgeYears: int

class AnalysisResponse(BaseModel):
    score: int
    riskCategory: str
    positiveInsightsJson: str
    riskFactorsJson: str

@app.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(status="ok", message="AI Engine is running")

@app.post("/api/v1/analyze", response_model=AnalysisResponse)
async def analyze_health(profile: MsmeProfile):
    # Simulated ML Pipeline heuristic logic
    score = 50
    insights = []
    risks = []
    
    if profile.annualRevenue > 500000:
        score += 20
        insights.append(f"Strong annual revenue of {profile.annualRevenue}")
    else:
        risks.append("Low annual revenue")
        
    if profile.businessAgeYears > 3:
        score += 15
        insights.append("Established business age")
    else:
        risks.append("Newly established business, higher volatility")
        
    if profile.industry.lower() in ["tech", "software", "healthcare"]:
        score += 10
        insights.append("Operating in a high-growth industry")
        
    # Cap score at 100
    score = min(score, 100)
    
    if score >= 80:
        risk = "LOW"
    elif score >= 60:
        risk = "MEDIUM"
    else:
        risk = "HIGH"
        
    import json
    return AnalysisResponse(
        score=score,
        riskCategory=risk,
        positiveInsightsJson=json.dumps(insights),
        riskFactorsJson=json.dumps(risks)
    )

@app.get("/")
async def root():
    return {"message": "Welcome to FinPulse AI Engine"}
