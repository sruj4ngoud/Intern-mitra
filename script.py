# Create the complete internship recommendation system codebase structure
import os
import json

# Create the directory structure
def create_directory_structure():
    """
    Create the complete project directory structure for Windows
    """
    
    # Define the project structure
    project_structure = {
        "pm-internship-recommender": {
            "frontend": {
                "public": {
                    "index.html": "",
                    "manifest.json": "",
                    "favicon.ico": "",
                    "logo192.png": "",
                    "logo512.png": ""
                },
                "src": {
                    "components": {
                        "__init__.py": "",
                        "InternshipCard.jsx": "",
                        "SearchForm.jsx": "",
                        "RecommendationsList.jsx": "",
                        "LoadingSpinner.jsx": ""
                    },
                    "pages": {
                        "Home.jsx": "",
                        "Results.jsx": ""
                    },
                    "utils": {
                        "api.js": "",
                        "constants.js": ""
                    },
                    "App.jsx": "",
                    "App.css": "",
                    "index.js": "",
                    "index.css": ""
                },
                "package.json": "",
                "tailwind.config.js": "",
                "postcss.config.js": "",
                ".gitignore": ""
            },
            "backend": {
                "app": {
                    "__init__.py": "",
                    "main.py": "",
                    "models.py": "",
                    "recommendation_engine.py": "",
                    "data_processor.py": "",
                    "api_routes.py": ""
                },
                "data": {
                    "internships_dataset.json": "",
                    "skills_taxonomy.json": "",
                    "sectors_mapping.json": ""
                },
                "requirements.txt": "",
                ".env": "",
                "run.py": ""
            },
            "docs": {
                "setup_instructions.md": "",
                "api_documentation.md": "",
                "deployment_guide.md": ""
            },
            "scripts": {
                "setup_windows.bat": "",
                "run_backend.bat": "",
                "run_frontend.bat": "",
                "install_dependencies.bat": ""
            },
            "README.md": "",
            ".gitignore": "",
            "docker-compose.yml": ""
        }
    }
    
    return project_structure

# Display the structure
structure = create_directory_structure()
print("📁 PM Internship Recommender - Complete Project Structure")
print("=" * 60)

def print_structure(structure, indent=0):
    for key, value in structure.items():
        print("  " * indent + f"📂 {key}")
        if isinstance(value, dict):
            print_structure(value, indent + 1)
        else:
            print("  " * (indent + 1) + f"📄 {key}")

print_structure(structure)

print("\n🎯 This structure provides:")
print("- Complete separation of frontend (React) and backend (FastAPI)")
print("- Organized component structure for easy maintenance")  
print("- Data directory for internship datasets")
print("- Windows-specific batch scripts for easy setup")
print("- Documentation for setup and deployment")
print("- Docker support for containerized deployment")