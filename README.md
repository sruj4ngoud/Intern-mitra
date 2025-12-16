# InternMitra – PM Internship Finder(INTERNAL SIH 2025)

AI + Rule-based recommendation engine for the Prime Minister’s Internship Scheme.

## Highlights
- Inputs: student profile (education, skills, sector, location)
- Model: TF-IDF + cosine + eligibility/location/sector rules
- Output: top 3–5 internships with "why this matches"
- Stack: FastAPI (Python), React + Tailwind, scikit‑learn, JSON datasets
- Performance: sub‑second responses; privacy‑first (no PII stored)

## Project Structure
See `complete-readme.md` for a detailed walkthrough and `docs/research_summary.txt` for the research write‑up, architecture, and tuning guidelines.

## Local Run (summary)
- Backend (FastAPI): `backend/app/main.py` (Uvicorn)
- Frontend (React): `frontend/` (npm start)
- Data: `backend/data/*.json`

## Why this project:
This project was built as part of **Smart India Hackathon (SIH) 2025 – Internal Round at GITAM University, Hyderabad**.**PROBLEM_STATEMENT:SIH25034** Our team developed an **AI-powered internship recommendation engine** tailored for the **PM Internship Scheme**, designed to help students discover the most relevant opportunities based on their **education, skills, sectors of interest, and location**. We combined a lightweight **TF-IDF + cosine similarity model** with **rule-based eligibility filters** to ensure both accuracy and explainability. The entire system was built end-to-end within a **24-hour hackathon sprint**, using a **FastAPI backend**, **React + Tailwind frontend**, and **scikit-learn** for the core recommendation engine. The outcome is a fast, transparent, and government-ready platform that generates personalized recommendations in real-time, showcasing how AI can bridge students with internships effectively.



## Documentation
- Research summary: `docs/research_summary.txt`
- Architecture & pitch: see docs and repository root files

## License
MIT License 
All Rights Reserved – For SIH use(BY TEAM InternMitra)
