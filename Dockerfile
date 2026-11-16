
# Build stage
FROM eclipse-temurin:26-jdk AS build

WORKDIR /app

COPY . .

RUN chmod +x mvnw

RUN ./mvnw -B clean package -DskipTests

# Run stage
FROM eclipse-temurin:26-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENV SERVER_PORT=10000
ENV SERVER_ADDRESS=0.0.0.0

EXPOSE 10000

ENTRYPOINT ["java", "-jar", "app.jar"]
