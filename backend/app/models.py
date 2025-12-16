# Pydantic Models for PM Internship Recommendation Engine
# File: backend/app/models.py

from pydantic import BaseModel, Field, validator
from typing import List, Optional
from enum import Enum

class EducationLevel(str, Enum):
    """Supported education levels"""
    BTECH = "B.Tech"
    BE = "B.E"
    BCA = "BCA"
    MCA = "MCA"
    MTECH = "M.Tech"
    BCOM = "B.Com"
    BBA = "BBA"
    MBA = "MBA"
    CA = "CA"
    MCOM = "M.Com"
    MBBS = "MBBS"
    BPHARMA = "B.Pharma"
    BDS = "BDS"
    BAMS = "BAMS"
    BSC_NURSING = "B.Sc Nursing"
    BSC = "BSc"
    BSC_AGRICULTURE = "B.Sc Agriculture"
    BTECH_AGRICULTURAL = "B.Tech Agricultural"
    MSC_AGRICULTURE = "M.Sc Agriculture"
    BED = "B.Ed"
    MED = "M.Ed"
    BA = "BA"
    MA = "MA"
    MSC = "MSc"
    DIPLOMA = "Diploma"
    ITI = "ITI"
    MASS_COMMUNICATION = "Mass Communication"

class SectorType(str, Enum):
    """Available sectors for internships"""
    TECHNOLOGY = "Technology"
    FINANCE = "Finance"
    HEALTHCARE = "Healthcare"
    AGRICULTURE = "Agriculture"
    MARKETING = "Marketing"
    MANUFACTURING = "Manufacturing"
    EDUCATION = "Education"

class RecommendationRequest(BaseModel):
    """Request model for getting internship recommendations"""
    education: EducationLevel = Field(
        ..., 
        description="Current education level of the user",
        example="B.Tech"
    )
    skills: List[str] = Field(
        ..., 
        min_items=1, 
        max_items=10,
        description="List of skills the user possesses",
        example=["Python", "SQL", "Data Analysis"]
    )
    sectors: Optional[List[SectorType]] = Field(
        None,
        description="Preferred sectors for internships (optional)",
        example=["Technology", "Finance"]
    )
    location_state: Optional[str] = Field(
        None,
        description="Preferred state for internship location (optional)",
        example="Telangana"
    )
    max_results: Optional[int] = Field(
        5,
        ge=1,
        le=10,
        description="Maximum number of recommendations to return"
    )
    
    @validator('skills')
    def validate_skills(cls, v):
        """Validate skills list"""
        if not v:
            raise ValueError("At least one skill is required")
        # Remove duplicates while preserving order
        seen = set()
        unique_skills = []
        for skill in v:
            if skill.lower() not in seen:
                seen.add(skill.lower())
                unique_skills.append(skill.strip())
        return unique_skills
    
    @validator('location_state')
    def validate_location_state(cls, v):
        """Validate location state"""
        if v:
            return v.strip().title()
        return v

class InternshipResponse(BaseModel):
    """Response model for individual internship recommendation"""
    id: int = Field(..., description="Unique internship ID")
    title: str = Field(..., description="Internship job title")
    company: str = Field(..., description="Company offering the internship")
    sector: str = Field(..., description="Industry sector")
    location_city: str = Field(..., description="City location")
    location_state: str = Field(..., description="State location")
    stipend: str = Field(..., description="Monthly stipend amount")
    duration_weeks: int = Field(..., description="Duration in weeks")
    skills_required: List[str] = Field(..., description="Required skills")
    education_requirement: str = Field(..., description="Education requirement")
    description: str = Field(..., description="Job description")
    similarity_score: float = Field(..., ge=0.0, le=1.0, description="AI similarity score")
    reason: str = Field(..., description="Why this internship is recommended")
    apply_url: str = Field(..., description="Application URL")
    eligibility_criteria: List[str] = Field(..., description="Eligibility requirements")
    learning_outcomes: List[str] = Field(..., description="Expected learning outcomes")

class RecommendationResponse(BaseModel):
    """Complete recommendation response"""
    recommendations: List[InternshipResponse]
    total_found: int = Field(..., description="Total recommendations found")
    query_info: dict = Field(..., description="Information about the query")
    processing_time: float = Field(..., description="Processing time in seconds")

class ErrorResponse(BaseModel):
    """Error response model"""
    error: str = Field(..., description="Error message")
    detail: Optional[str] = Field(None, description="Detailed error information")
    code: Optional[int] = Field(None, description="Error code")

class StatsResponse(BaseModel):
    """Statistics response model"""
    total_internships: int
    total_sectors: int
    total_companies: int
    total_locations: int
    sector_distribution: dict
    sectors: List[str]
    top_companies: List[str]

class SectorsResponse(BaseModel):
    """Available sectors response"""
    sectors: List[str]

class LocationsResponse(BaseModel):
    """Available locations response"""
    states: List[str]
    cities: List[str]

class SkillsResponse(BaseModel):
    """Available skills response"""
    skills: List[str]

# Utility functions for data validation
def validate_education_level(education: str) -> bool:
    """Validate if education level is supported"""
    return education in [e.value for e in EducationLevel]

def validate_sector(sector: str) -> bool:
    """Validate if sector is supported"""
    return sector in [s.value for s in SectorType]

def normalize_skill(skill: str) -> str:
    """Normalize skill name for consistency"""
    return skill.strip().title()

def normalize_location(location: str) -> str:
    """Normalize location name for consistency"""
    return location.strip().title()

# Common skill mappings for better matching
SKILL_MAPPINGS = {
    # Programming languages
    "javascript": ["JS", "ECMAScript", "Node.js", "React", "Vue"],
    "python": ["Django", "Flask", "FastAPI", "Pandas", "NumPy"],
    "java": ["Spring", "Hibernate", "JSP", "Servlets"],
    "sql": ["MySQL", "PostgreSQL", "Oracle", "SQL Server"],
    
    # Technologies
    "machine learning": ["ML", "AI", "Deep Learning", "Neural Networks"],
    "data analysis": ["Analytics", "Data Science", "Statistics"],
    "web development": ["Frontend", "Backend", "Full Stack"],
    
    # Soft skills
    "communication": ["Presentation", "Writing", "Verbal"],
    "leadership": ["Team Management", "Project Management"],
}

def get_skill_variations(skill: str) -> List[str]:
    """Get all variations of a skill for better matching"""
    skill_lower = skill.lower()
    variations = [skill]
    
    for key, values in SKILL_MAPPINGS.items():
        if skill_lower == key or skill_lower in [v.lower() for v in values]:
            variations.extend(values)
            variations.append(key)
    
    return list(set(variations))

# Example usage and testing
if __name__ == "__main__":
    # Test request model
    test_request = {
        "education": "B.Tech",
        "skills": ["Python", "SQL", "Machine Learning"],
        "sectors": ["Technology", "Finance"],
        "location_state": "Telangana",
        "max_results": 5
    }
    
    request = RecommendationRequest(**test_request)
    print("✅ Request model validation successful")
    print(f"📝 Parsed request: {request}")
    
    # Test skill variations
    print("\n🔄 Skill variations:")
    for skill in request.skills:
        variations = get_skill_variations(skill)
        print(f"  {skill}: {variations}")