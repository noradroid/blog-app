FROM maven:3.8.6-eclipse-temurin-17 as build
COPY . /app
WORKDIR /app
RUN mvn verify
FROM eclipse-temurin:17-jdk-alpine
ARG JAR_FILE
ENV JAR=$JAR_FILE
COPY --from=build /app/target/$JAR /app/
EXPOSE 8080
ENTRYPOINT java -jar "/app/$JAR"
