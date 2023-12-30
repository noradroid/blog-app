package com.example.blog.service.adapter;

import com.example.blog.exception.FileNotFoundException;
import com.example.blog.exception.NotFoundException;
import io.minio.BucketExistsArgs;
import io.minio.GetObjectArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.UploadObjectArgs;
import io.minio.errors.ErrorResponseException;
import io.minio.errors.InsufficientDataException;
import io.minio.errors.InternalException;
import io.minio.errors.InvalidResponseException;
import io.minio.errors.ServerException;
import io.minio.errors.XmlParserException;
import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MinioAdapter {

    @Autowired
    private MinioClient minioClient;

    public void uploadFile(String bucketName, String fileName, String filePath) {
        if (!bucketExists(bucketName)) {
            createBucket(bucketName);
        }
        log.info("Uploading file to MinIO");
        try {
            minioClient.uploadObject(
                UploadObjectArgs.builder().bucket(bucketName).object(fileName).filename(filePath)
                    .build());
        } catch (ErrorResponseException | InsufficientDataException | InternalException |
                 InvalidKeyException
                 | InvalidResponseException | IOException | NoSuchAlgorithmException |
                 ServerException
                 | XmlParserException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public void uploadFile(String bucketName, String fileName, InputStream inputStream) {
        if (!bucketExists(bucketName)) {
            createBucket(bucketName);
        }
        log.info("Uploading file to MinIO");
        try {
            minioClient.putObject(
                PutObjectArgs.builder().bucket(bucketName).object(fileName)
                    .stream(inputStream, -1, 10485760).build());
            log.info("Successfully uploaded file to MinIO");
        } catch (ErrorResponseException | InsufficientDataException | InternalException |
                 InvalidKeyException
                 | InvalidResponseException | IOException | NoSuchAlgorithmException |
                 ServerException
                 | XmlParserException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public byte[] downloadFile(String bucketName, String path) throws FileNotFoundException {
        if (!bucketExists(bucketName)) {
            log.error("Bucket ".concat(bucketName).concat(" does not exist"));
            throw new NotFoundException("Bucket ".concat(bucketName).concat(" does not exist"));
        }
        log.info("Downloading file from MinIO");
        try (
            InputStream inputStream = minioClient.getObject(
                GetObjectArgs.builder().bucket(bucketName).object(path).build())
        ) {
            log.info("Successfully downloaded file from MinIO");
            return inputStream.readAllBytes();
        } catch (ErrorResponseException | InsufficientDataException | InternalException |
                 InvalidKeyException
                 | InvalidResponseException | IOException | NoSuchAlgorithmException |
                 ServerException
                 | XmlParserException e) {
            if (e instanceof ErrorResponseException
                && ((ErrorResponseException) e).errorResponse().code().equals("NoSuchKey")) {
                log.error("File ".concat(path).concat(" does not exist"));
                throw new FileNotFoundException();
            } else {
                log.error(e.getMessage());
                throw new RuntimeException(e);
            }
        }
    }

    public void createBucket(String name) {
        log.info("Creating bucket in MinIO");
        try {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(name).build());
        } catch (ErrorResponseException | InsufficientDataException | InternalException |
                 InvalidKeyException
                 | InvalidResponseException | IOException | NoSuchAlgorithmException |
                 ServerException
                 | XmlParserException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private boolean bucketExists(String name) {
        try {
            return minioClient.bucketExists(BucketExistsArgs.builder().bucket(name).build());
        } catch (ServerException | InsufficientDataException | ErrorResponseException | IOException
                 | NoSuchAlgorithmException | InvalidKeyException | InvalidResponseException |
                 XmlParserException
                 | InternalException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
