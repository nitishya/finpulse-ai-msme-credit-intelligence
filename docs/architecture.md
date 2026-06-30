# FinPulse AI Architecture

## Overview
FinPulse AI uses a **Modular Monolith** pattern for the backend, separated frontend application, and an independent AI engine service. This balances the simplicity of deployment with the scalability of microservices when needed.

## Components

### 1. Frontend Layer (Angular)
- Single Page Application built with Angular.
- Modules separated by business domains: Auth, Dashboard, MSME Profiling, Health Score, Loan Application.
- Styled with Tailwind CSS for consistent and rapid UI development.

### 2. Backend Layer (Spring Boot)
- **Modular Monolith**: Uses bounded contexts (packages) to isolate domain logic.
- Packages:
  - `controller`: REST APIs
  - `service`: Business Logic
  - `repository`: Data access logic (Spring Data JPA)
  - `entity`: JPA entities mapping to PostgreSQL tables
  - `dto`: Data Transfer Objects for API requests and responses
  - `exception`: Global exception handling
  - `security`: Security configuration (e.g., JWT)
- Connected to PostgreSQL as the primary transactional database.

### 3. AI Engine Layer (FastAPI)
- Handles specialized tasks like MSME credit risk scoring and financial intelligence processing.
- Built using Python and FastAPI for fast asynchronous execution and native data science library support.
- Communicates with Backend via REST over the internal network.
- Uses MongoDB for unstructured data or flexible AI schema needs.

### 4. Data Layer
- **PostgreSQL**: Primary relational database for transactions, users, and core domain data.
- **MongoDB**: NoSQL database for flexible data, logs, and AI processing outputs.

## Deployment Architecture
- Containerized using Docker.
- Orchestrated locally with Docker Compose.
- CI/CD target: Google Cloud Run for container deployment.
