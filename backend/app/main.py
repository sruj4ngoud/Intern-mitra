# PM Internship Recommendation Engine - FastAPI Backend
# File: backend/app/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import json
import os
from app.recommendation_engine import InternshipRecommendationEngine
from app.models import RecommendationRequest, InternshipResponse

# Initialize FastAPI app
app = FastAPI(
    title="PM Internship Recommendation API",
    description="AI-powered recommendation engine for PM Internship Scheme",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Initialize recommendation engine
recommendation_engine = None

@app.on_event("startup")
async def startup_event():
    """Initialize the recommendation engine on startup"""
    global recommendation_engine
    try:
        data_path = os.path.join(os.path.dirname(__file__), "..", "data", "internships_dataset.json")
        recommendation_engine = InternshipRecommendationEngine(data_path)
        recommendation_engine.load_data()
        print("✅ Recommendation engine initialized successfully")
    except Exception as e:
        print(f"❌ Error initializing recommendation engine: {e}")
        raise e

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "PM Internship Recommendation Engine API",
        "status": "active",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check with system status"""
    return {
        "status": "healthy",
        "engine_status": "loaded" if recommendation_engine else "not_loaded",
        "total_internships": len(recommendation_engine.internships) if recommendation_engine else 0
    }

@app.post("/api/recommend", response_model=List[InternshipResponse])
async def get_recommendations(request: RecommendationRequest):
    """
    Get personalized internship recommendations
    
    Args:
        request: User preferences including education, skills, sectors, location
    
    Returns:
        List of recommended internships with explanations
    """
    if not recommendation_engine:
        raise HTTPException(status_code=500, detail="Recommendation engine not initialized")
    
    try:
        # Validate request
        if not request.skills or len(request.skills) == 0:
            raise HTTPException(status_code=400, detail="At least one skill is required")
        
        # Get recommendations from engine
        recommendations = recommendation_engine.get_recommendations(
            education=request.education,
            skills=request.skills,
            sectors=request.sectors,
            location_state=request.location_state,
            max_results=request.max_results or 5
        )
        
        if not recommendations:
            return []
        
        # Convert to response format
        response = []
        for rec in recommendations:
            internship_response = InternshipResponse(
                id=rec["id"],
                title=rec["title"],
                company=rec["company"],
                sector=rec["sector"],
                location_city=rec["location_city"],
                location_state=rec["location_state"],
                stipend=rec["stipend"],
                duration_weeks=rec["duration_weeks"],
                skills_required=rec["skills_required"],
                education_requirement=rec["education_requirement"],
                description=rec["description"],
                similarity_score=rec["similarity_score"],
                reason=rec["reason"],
                apply_url=rec["apply_url"],
                eligibility_criteria=rec["eligibility_criteria"],
                learning_outcomes=rec["learning_outcomes"]
            )
            response.append(internship_response)
        
        return response
        
    except Exception as e:
        print(f"Error generating recommendations: {e}")
        raise HTTPException(status_code=500, detail=f"Error generating recommendations: {str(e)}")

@app.get("/api/sectors")
async def get_sectors():
    """Get available sectors"""
    if not recommendation_engine:
        raise HTTPException(status_code=500, detail="Recommendation engine not initialized")
    
    sectors = list(set([internship["sector"] for internship in recommendation_engine.internships]))
    return {"sectors": sorted(sectors)}

@app.get("/api/locations")
async def get_locations():
    """Get available locations"""
    if not recommendation_engine:
        raise HTTPException(status_code=500, detail="Recommendation engine not initialized")
    
    states = list(set([internship["location_state"] for internship in recommendation_engine.internships]))
    cities = list(set([internship["location_city"] for internship in recommendation_engine.internships]))
    
    return {
        "states": sorted([state for state in states if state != "Multiple"]),
        "cities": sorted(cities)
    }

@app.get("/api/skills")
async def get_skills():
    """Get available skills from all internships"""
    if not recommendation_engine:
        raise HTTPException(status_code=500, detail="Recommendation engine not initialized")
    
    all_skills = set()
    for internship in recommendation_engine.internships:
        all_skills.update(internship["skills_required"])
    
    return {"skills": sorted(list(all_skills))}

@app.get("/api/stats")
async def get_statistics():
    """Get system statistics"""
    if not recommendation_engine:
        raise HTTPException(status_code=500, detail="Recommendation engine not initialized")
    
    internships = recommendation_engine.internships
    
    # Calculate statistics
    total_internships = len(internships)
    sectors = list(set([i["sector"] for i in internships]))
    companies = list(set([i["company"] for i in internships]))
    locations = list(set([i["location_city"] for i in internships]))
    
    # Sector distribution
    from collections import Counter
    sector_dist = Counter([i["sector"] for i in internships])
    
    return {
        "total_internships": total_internships,
        "total_sectors": len(sectors),
        "total_companies": len(companies),
        "total_locations": len(locations),
        "sector_distribution": dict(sector_dist),
        "sectors": sorted(sectors),
        "top_companies": sorted(companies)[:10]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )