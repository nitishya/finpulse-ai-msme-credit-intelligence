# FinPulse AI
AI-Powered MSME Financial Intelligence & Credit Readiness Platform

## Architecture
Modular Monolith structure with separate Backend, Frontend, and AI Engine services.

### Technologies
- **Frontend**: Angular, Tailwind CSS
- **Backend**: Java, Spring Boot, Maven, PostgreSQL
- **AI Engine**: Python, FastAPI, MongoDB
- **Deployment**: Docker, Google Cloud Run

## Project Structure
- `/backend`: Spring Boot application
- `/frontend`: Angular application
- `/ai-engine`: FastAPI application
- `/database/schema`: Database schemas and initial scripts
- `/docs`: Architecture documentation

## Local Setup with Docker
Prerequisites: Docker and docker-compose.

1. Clone the repository.
2. Run `docker-compose up -d --build` to start all services.
3. Access points:
   - Frontend: `http://localhost:4200`
   - Backend API: `http://localhost:8080`
   - AI Engine API: `http://localhost:8000/docs`
   - PostgreSQL: `localhost:5432`
   - MongoDB: `localhost:27017`
