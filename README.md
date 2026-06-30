# FinPulse AI 🚀
**AI-Powered MSME Financial Intelligence & Credit Readiness Platform**

[![Cloud Run](https://img.shields.io/badge/Google%20Cloud-Run-blue)](https://cloud.google.com/run)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.x-green)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-17-red)](https://angular.io)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100-teal)](https://fastapi.tiangolo.com)

---

## Architecture

Modular Monolith with separate AI Engine service.

```
finpulse-ai/
├── backend/          # Spring Boot 4.x REST API
├── frontend/         # Angular 17 + Tailwind CSS UI (served by backend)
├── ai-engine/        # Python FastAPI ML Analysis Engine
├── database/schema/  # Database schemas
├── docs/             # Architecture documentation
├── Dockerfile        # Root Dockerfile (builds full-stack container)
├── cloudbuild.yaml   # Google Cloud Build config
└── docker-compose.yml
```

## Features

### ✅ Authentication
- JWT-based stateless auth
- Role-based access: `MSME_USER` and `BANKER`
- BCrypt password hashing

### ✅ MSME Profile
- Business Name, GST Number, Industry, Location
- Annual Revenue, Business Age

### ✅ Financial Data
- GST, UPI, Revenue transaction tracking
- Payment behavior history

### ✅ AI Health Score Engine
- Score: 0–100
- Risk: LOW / MEDIUM / HIGH
- AI Explainability: Positive factors + Risk factors

### ✅ Professional UI
- Login / Register
- MSME Dashboard
- SVG Health Score Gauge
- AI Insights
- Loan Readiness Checker
- Banker Dashboard

---

## Local Development with Docker

```bash
# Clone the repository
git clone https://github.com/nitishya/finpulse-ai-msme-credit-intelligence.git
cd finpulse-ai-msme-credit-intelligence

# Start all services
docker-compose up --build

# Access points:
# Frontend + API: http://localhost:8080
# AI Engine Docs: http://localhost:8000/docs
# PostgreSQL:     localhost:5432
# MongoDB:        localhost:27017
```

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register user | Public |
| POST | `/api/auth/login` | Login, get JWT token | Public |
| POST | `/api/msme/profile` | Create/Update MSME profile | Required |
| GET  | `/api/msme/profile` | Get MSME profile | Required |
| GET  | `/api/msme/all` | All profiles (Banker) | Required |
| POST | `/api/finance/transaction` | Add transaction | Required |
| GET  | `/api/finance/transactions` | Get transactions | Required |
| POST | `/api/score/generate` | Generate AI health score | Required |
| GET  | `/api/score/` | Get existing score | Required |

---

## Deployment

### Google Cloud Run (GCP Project: `finpulse-ai-501010`)
Cloud Run deployment is triggered automatically on `git push` to `main` via Cloud Build.
The root `Dockerfile` builds the full-stack container (Angular served by Spring Boot).

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Angular 17, Tailwind CSS |
| Backend | Java 17, Spring Boot 4.x, Maven |
| Security | Spring Security, JWT (JJWT 0.11.5) |
| AI Engine | Python 3.11, FastAPI |
| Database | H2 (dev) / PostgreSQL (prod), MongoDB |
| Deployment | Docker, Google Cloud Run |
