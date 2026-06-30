# Stage 1: Build the Angular Frontend
FROM node:18-alpine as frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build -- --configuration production

# Stage 2: Build the Spring Boot Backend
FROM eclipse-temurin:17-jdk-alpine as backend-builder
WORKDIR /app
COPY backend/mvnw .
COPY backend/.mvn .mvn
COPY backend/pom.xml .
COPY backend/src src

# Merge the compiled Angular UI into the Spring Boot static resources folder!
COPY --from=frontend-builder /app/frontend/dist/frontend/browser src/main/resources/static

RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Stage 3: Run the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
