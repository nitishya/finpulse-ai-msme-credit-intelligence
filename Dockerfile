# Default Dockerfile at the root to resolve Google Cloud automated build errors.
# By default, this builds and deploys the Spring Boot Backend.

FROM eclipse-temurin:17-jdk-alpine as builder
WORKDIR /app

# Copy the backend source code
COPY backend/mvnw .
COPY backend/.mvn .mvn
COPY backend/pom.xml .
COPY backend/src src

# Build the application
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

# Cloud Run expects the container to listen on the port defined by the PORT environment variable.
# Spring Boot uses 8080 by default, which matches Cloud Run's default.
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
