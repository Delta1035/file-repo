FROM harbor.wistron.com/base_image/openjdk:11-jdk

COPY target/engine_data_monitor-0.0.1-SNAPSHOT.jar /app/app.jar
COPY src/main/resources/application.yml /app/application.yml

ENTRYPOINT ["sh","-c","java -Dspring.config.location=/app/application.yml -jar /app/app.jar"]
