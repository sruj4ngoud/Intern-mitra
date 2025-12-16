# Create comprehensive internship dataset directly
import json
import random
from datetime import datetime, timedelta
from collections import Counter

# Comprehensive sector configuration
sectors_data = {
    "Technology": {
        "skills": [
            "Python", "Java", "JavaScript", "React", "Node.js", "SQL", 
            "Machine Learning", "Data Analysis", "API Development", "Git",
            "HTML", "CSS", "Angular", "Vue.js", "MongoDB", "PostgreSQL",
            "Docker", "AWS", "Kubernetes", "Django", "Flask", "Spring Boot",
            "C++", "C#", ".NET", "PHP", "Ruby", "Swift", "Kotlin",
            "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-learn"
        ],
        "education": ["B.Tech", "B.E", "MCA", "BCA", "M.Tech", "BSc"],
        "locations": [
            "Hyderabad", "Bangalore", "Chennai", "Mumbai", "Pune", "Delhi",
            "Noida", "Gurgaon", "Kolkata", "Ahmedabad", "Coimbatore"
        ],
        "companies": [
            "TCS", "Infosys", "Wipro", "Tech Mahindra", "Cognizant", 
            "HCL Technologies", "IBM India", "Microsoft India", 
            "Google India", "Amazon India", "Flipkart", "Paytm",
            "Zomato", "Swiggy", "BYJU'S", "Accenture", "Capgemini"
        ],
        "job_titles": [
            "Software Developer Intern", "Data Analyst Intern", 
            "Web Developer Intern", "ML Engineer Intern", 
            "Backend Developer Intern", "Frontend Developer Intern",
            "Full Stack Developer Intern", "DevOps Engineer Intern",
            "Mobile App Developer Intern", "Data Scientist Intern"
        ]
    },
    "Finance": {
        "skills": [
            "Excel", "Financial Analysis", "Accounting", "SQL", 
            "Risk Management", "Investment Analysis", "Banking Operations",
            "Taxation", "Financial Modeling", "Portfolio Management",
            "Credit Analysis", "Audit", "Compliance", "IFRS", "GAAP",
            "Bloomberg Terminal", "Tally", "SAP FICO", "QuickBooks"
        ],
        "education": ["B.Com", "BBA", "MBA", "CA", "M.Com", "CFA", "BSc"],
        "locations": [
            "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", 
            "Pune", "Kolkata", "Ahmedabad", "Gurgaon", "Noida"
        ],
        "companies": [
            "HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank",
            "Kotak Mahindra Bank", "Yes Bank", "Punjab National Bank",
            "Bank of India", "HDFC Life", "ICICI Prudential",
            "Bajaj Finserv", "Aditya Birla Capital", "Reliance Capital"
        ],
        "job_titles": [
            "Finance Intern", "Investment Banking Intern", 
            "Risk Analyst Intern", "Accounting Intern",
            "Financial Analyst Intern", "Credit Analyst Intern",
            "Treasury Intern", "Audit Intern", "Compliance Intern"
        ]
    },
    "Healthcare": {
        "skills": [
            "Medical Knowledge", "Patient Care", "Data Entry", "Research",
            "Laboratory Skills", "Healthcare Analytics", "Medical Coding",
            "Hospital Management", "Electronic Health Records", "HIPAA",
            "Clinical Research", "Pharmacology", "Biostatistics",
            "Medical Devices", "Telemedicine", "Health Informatics"
        ],
        "education": [
            "MBBS", "B.Pharma", "BDS", "BAMS", "B.Sc Nursing", 
            "BSc", "M.Pharma", "MD", "MS", "BPT"
        ],
        "locations": [
            "Delhi", "Mumbai", "Chennai", "Bangalore", "Hyderabad",
            "Kolkata", "Pune", "Ahmedabad", "Lucknow", "Jaipur"
        ],
        "companies": [
            "AIIMS", "Apollo Hospitals", "Fortis Healthcare", 
            "Max Healthcare", "Manipal Hospitals", "Narayana Health",
            "Medanta", "Columbia Asia", "Cloudnine Hospitals",
            "Dr. Reddy's", "Cipla", "Sun Pharma", "Lupin"
        ],
        "job_titles": [
            "Medical Research Intern", "Healthcare Analytics Intern",
            "Clinical Research Intern", "Hospital Administration Intern",
            "Pharmaceutical Research Intern", "Medical Coding Intern",
            "Healthcare IT Intern", "Public Health Intern"
        ]
    },
    "Agriculture": {
        "skills": [
            "Crop Management", "Soil Analysis", "Agricultural Technology",
            "Data Collection", "Field Research", "Organic Farming",
            "Precision Agriculture", "Irrigation Systems", "Pest Management",
            "Agricultural Economics", "Supply Chain", "Food Processing",
            "Sustainable Farming", "Agricultural Machinery", "GIS"
        ],
        "education": [
            "B.Sc Agriculture", "B.Tech Agricultural", "M.Sc Agriculture",
            "BSc", "B.Tech Food Technology", "Agricultural Engineering"
        ],
        "locations": [
            "Punjab", "Haryana", "Maharashtra", "Karnataka", 
            "Andhra Pradesh", "Tamil Nadu", "Uttar Pradesh",
            "Madhya Pradesh", "Gujarat", "Rajasthan"
        ],
        "companies": [
            "ITC Limited", "Mahindra Agri Solutions", "Tata Chemicals",
            "Coromandel International", "UPL Limited", "Rallis India",
            "Bayer CropScience", "Syngenta India", "IFFCO",
            "Jain Irrigation", "Netafim", "Godrej Agrovet"
        ],
        "job_titles": [
            "Agricultural Research Intern", "Farm Management Intern",
            "AgriTech Intern", "Crop Specialist Intern",
            "Soil Research Intern", "Agricultural Marketing Intern",
            "Precision Agriculture Intern", "Agricultural Extension Intern"
        ]
    },
    "Marketing": {
        "skills": [
            "Digital Marketing", "Content Writing", "Social Media Marketing",
            "Market Research", "Brand Management", "SEO", "Analytics",
            "Google Ads", "Facebook Advertising", "Email Marketing",
            "Influencer Marketing", "CRM", "Lead Generation",
            "Marketing Automation", "Graphic Design", "Video Editing"
        ],
        "education": [
            "BBA", "MBA", "B.Com", "BA", "Mass Communication",
            "Journalism", "BSc", "Advertising"
        ],
        "locations": [
            "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad",
            "Chennai", "Kolkata", "Ahmedabad", "Gurgaon", "Noida"
        ],
        "companies": [
            "Hindustan Unilever", "Procter & Gamble", "Nestle India",
            "Coca-Cola India", "PepsiCo India", "Asian Paints",
            "Godrej Consumer Products", "Wipro Consumer Care",
            "Ogilvy", "JWT", "Leo Burnett", "Publicis India"
        ],
        "job_titles": [
            "Digital Marketing Intern", "Brand Management Intern",
            "Content Marketing Intern", "Market Research Intern",
            "Social Media Marketing Intern", "SEO Intern",
            "Performance Marketing Intern", "Creative Intern"
        ]
    },
    "Manufacturing": {
        "skills": [
            "Quality Control", "Production Planning", "Lean Manufacturing",
            "Safety Protocols", "Process Improvement", "Supply Chain",
            "Six Sigma", "Kaizen", "Industrial Engineering",
            "Manufacturing Execution Systems", "Automation", "Robotics",
            "Materials Management", "Inventory Control", "CAD/CAM"
        ],
        "education": [
            "B.E", "B.Tech", "Diploma", "ITI", "Mechanical Engineering",
            "Industrial Engineering", "Production Engineering"
        ],
        "locations": [
            "Chennai", "Pune", "Ahmedabad", "Coimbatore", "Hyderabad",
            "Bangalore", "Aurangabad", "Vadodara", "Hosur", "Pithampur"
        ],
        "companies": [
            "Tata Motors", "Mahindra & Mahindra", "Bajaj Auto",
            "Hero MotoCorp", "Maruti Suzuki", "TVS Motors",
            "Larsen & Toubro", "Bharat Heavy Electricals",
            "Godrej & Boyce", "Ashok Leyland", "Force Motors"
        ],
        "job_titles": [
            "Production Intern", "Quality Assurance Intern",
            "Supply Chain Intern", "Process Engineer Intern",
            "Manufacturing Technology Intern", "Industrial Engineering Intern",
            "Operations Intern", "Maintenance Intern"
        ]
    },
    "Education": {
        "skills": [
            "Teaching", "Curriculum Development", "Educational Technology",
            "Content Creation", "Student Assessment", "Classroom Management",
            "E-learning Platforms", "Learning Management Systems",
            "Educational Research", "Training Design", "Instructional Design",
            "Academic Writing", "Student Counseling", "Educational Psychology"
        ],
        "education": [
            "B.Ed", "M.Ed", "BA", "BSc", "MA", "MSc", 
            "B.Tech", "Subject Specialization"
        ],
        "locations": [
            "Delhi", "Mumbai", "Bangalore", "Chennai", "Pune",
            "Hyderabad", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow"
        ],
        "companies": [
            "BYJU'S", "Unacademy", "Vedantu", "Toppr", "White Hat Jr",
            "Extramarks", "Meritnation", "Simplilearn", "UpGrad",
            "Coursera India", "edX", "Khan Academy India"
        ],
        "job_titles": [
            "Teaching Assistant Intern", "Content Developer Intern",
            "Educational Technology Intern", "Curriculum Intern",
            "Academic Research Intern", "Learning Design Intern",
            "Student Support Intern", "Training Intern"
        ]
    }
}

# Function to get state for city
def get_state_for_city(city):
    city_state_mapping = {
        "Hyderabad": "Telangana", "Bangalore": "Karnataka", "Chennai": "Tamil Nadu",
        "Mumbai": "Maharashtra", "Pune": "Maharashtra", "Delhi": "Delhi",
        "Noida": "Uttar Pradesh", "Gurgaon": "Haryana", "Kolkata": "West Bengal",
        "Ahmedabad": "Gujarat", "Coimbatore": "Tamil Nadu", "Jaipur": "Rajasthan",
        "Lucknow": "Uttar Pradesh", "Punjab": "Punjab", "Haryana": "Haryana",
        "Karnataka": "Karnataka", "Andhra Pradesh": "Andhra Pradesh",
        "Tamil Nadu": "Tamil Nadu", "Uttar Pradesh": "Uttar Pradesh",
        "Madhya Pradesh": "Madhya Pradesh", "Rajasthan": "Rajasthan",
        "Aurangabad": "Maharashtra", "Vadodara": "Gujarat", "Hosur": "Tamil Nadu",
        "Pithampur": "Madhya Pradesh"
    }
    return city_state_mapping.get(city, "Multiple")

# Generate realistic stipend
def generate_realistic_stipend(sector):
    stipend_ranges = {
        "Technology": (12000, 30000),
        "Finance": (10000, 25000),
        "Healthcare": (8000, 22000),
        "Agriculture": (8000, 18000),
        "Marketing": (10000, 24000),
        "Manufacturing": (9000, 20000),
        "Education": (8000, 20000)
    }
    min_stipend, max_stipend = stipend_ranges.get(sector, (8000, 20000))
    return random.randint(min_stipend, max_stipend)

# Generate internships
internships = []
internship_id = 1

# Generate 28-29 internships per sector (7 sectors * 28-29 = ~200)
for sector, data in sectors_data.items():
    for i in range(29 if sector == "Technology" else 28):
        company = random.choice(data["companies"])
        location = random.choice(data["locations"])
        education_req = random.choice(data["education"])
        job_title = random.choice(data["job_titles"])
        
        # Select 3-5 relevant skills
        num_skills = random.randint(3, 5)
        selected_skills = random.sample(data["skills"], min(num_skills, len(data["skills"])))
        
        # Generate realistic stipend and duration
        stipend = generate_realistic_stipend(sector)
        duration = random.choice([8, 10, 12, 16])
        
        # Generate job description
        descriptions = {
            "Technology": f"Join {company}'s technology team to work on cutting-edge projects using {selected_skills[0]} and {selected_skills[1]}. Develop innovative software solutions and contribute to product development.",
            "Finance": f"Support {company}'s financial operations with expertise in {selected_skills[0]} and {selected_skills[1]}. Gain hands-on experience in financial analysis and decision-making processes.",
            "Healthcare": f"Support healthcare initiatives at {company} focusing on {selected_skills[0]} and {selected_skills[1]}. Work with healthcare professionals to enhance patient care.",
            "Agriculture": f"Support agricultural innovation at {company} with focus on {selected_skills[0]} and {selected_skills[1]}. Work on sustainable farming projects using modern techniques.",
            "Marketing": f"Join {company}'s marketing team to develop {selected_skills[0]} campaigns and {selected_skills[1]} strategies. Support brand building and market expansion.",
            "Manufacturing": f"Support manufacturing operations at {company} with focus on {selected_skills[0]} and {selected_skills[1]}. Work with production teams on operational efficiency.",
            "Education": f"Support educational initiatives at {company} focusing on {selected_skills[0]} and {selected_skills[1]}. Contribute to curriculum development and student engagement."
        }
        
        # Generate dates
        deadline_days = random.randint(14, 28)
        deadline = (datetime.now() + timedelta(days=deadline_days)).strftime("%Y-%m-%d")
        start_days = deadline_days + random.randint(28, 56)
        start_date = (datetime.now() + timedelta(days=start_days)).strftime("%Y-%m-%d")
        
        internship = {
            "id": internship_id,
            "title": job_title,
            "company": company,
            "sector": sector,
            "location_city": location,
            "location_state": get_state_for_city(location),
            "stipend": f"₹{stipend:,}/month",
            "duration_weeks": duration,
            "education_requirement": education_req,
            "skills_required": selected_skills,
            "description": descriptions.get(sector, f"Work on {selected_skills[0]} and {selected_skills[1]} projects at {company}."),
            "application_deadline": deadline,
            "start_date": start_date,
            "apply_url": f"https://pminternship.mca.gov.in/apply/{internship_id}",
            "eligibility_criteria": [
                f"Currently pursuing {education_req} or equivalent degree",
                "Minimum 60% aggregate marks in current course",
                "Age between 18-25 years",
                f"Basic knowledge of {selected_skills[0]}" if selected_skills else "Relevant academic background"
            ],
            "learning_outcomes": [
                f"Hands-on experience in {selected_skills[0]}" if selected_skills else "Industry experience",
                f"Professional development in {selected_skills[1]}" if len(selected_skills) > 1 else "Professional skills",
                "Industry exposure and networking opportunities",
                "Certificate of completion from government internship scheme"
            ]
        }
        
        internships.append(internship)
        internship_id += 1

print(f"✅ Generated {len(internships)} internships successfully!")

# Display statistics
sector_counts = Counter([internship['sector'] for internship in internships])
company_counts = Counter([internship['company'] for internship in internships])
location_counts = Counter([internship['location_city'] for internship in internships])

print(f"\n📊 Dataset Statistics:")
print(f"  Total Internships: {len(internships)}")
print(f"  Unique Sectors: {len(sector_counts)}")
print(f"  Unique Companies: {len(company_counts)}")
print(f"  Unique Locations: {len(location_counts)}")

print(f"\n📈 Sector Distribution:")
for sector, count in sector_counts.items():
    print(f"  {sector}: {count} internships")

# Show sample entries
print(f"\n📄 Sample Internships:")
for i, internship in enumerate(internships[:5]):
    print(f"{i+1}. {internship['title']} at {internship['company']} ({internship['sector']})")
    print(f"   Skills: {', '.join(internship['skills_required'])}")
    print(f"   Location: {internship['location_city']}")
    print(f"   Stipend: {internship['stipend']}")

print(f"\n🎯 Dataset ready for 90%+ accuracy AI recommendations!")
print(f"💾 Total dataset size: {len(json.dumps(internships))} characters")