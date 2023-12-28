package com.example.blog.config;

import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinioConfig {

    private MinioClient minioClient;

    @Value("${minio.url}")
    private String url;

    @Value("${minio.access-key}")
    private String accessKey;

    @Value("${minio.secret-key}")
    private String secretKey;

    public MinioConfig() {
        minioClient = MinioClient.builder().endpoint(url).credentials(accessKey, secretKey).build();
    }
}
