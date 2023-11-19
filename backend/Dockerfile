#FROM maven:3.8.5-eclipse-temurin-17-alpine
#COPY . src
#RUN mvn verify
FROM eclipse-temurin:17-jdk-alpine
ARG JAR_FILE
ENV JAR=$JAR_FILE
COPY ./target/$JAR .
EXPOSE 8080
ENTRYPOINT java -jar "$JAR"
