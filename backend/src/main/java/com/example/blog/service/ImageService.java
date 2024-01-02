package com.example.blog.service;

import com.example.blog.constants.StatusConstants;
import com.example.blog.domain.Image;
import com.example.blog.exception.FileNotFoundException;
import com.example.blog.repository.ImageRepository;
import com.example.blog.service.adapter.MinioAdapter;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.compress.utils.FileNameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private MinioAdapter minioAdapter;

    @Value("${images.bucket-name:images}")
    private String bucketName;

    public Image uploadImage(MultipartFile file) {
        try (InputStream inputStream = new BufferedInputStream(file.getInputStream())) {
            String name = file.getOriginalFilename();
            minioAdapter.uploadFile(bucketName, generateUniqueFileName(name), inputStream);
            // TODO: Add field for saved file name in image object
            Image image = new Image();
            image.setName(name);
            image.setPath(name);
            image.setActive(StatusConstants.ACTIVE);
            return imageRepository.save(image);
        } catch (IOException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public Resource downloadImage(String name) {
        try {
            byte[] file = minioAdapter.downloadFile(bucketName, name);
            return new ByteArrayResource(file);
        } catch (FileNotFoundException e) {
            throw new FileNotFoundException(name);
        }
    }

    public Resource downloadImage(Image image) {
        try {
            byte[] file = minioAdapter.downloadFile(bucketName, image.getPath());
            return new ByteArrayResource(file);
        } catch (FileNotFoundException e) {
            throw new FileNotFoundException(image.getName());
        }
    }

    private String generateUniqueFileName(String fileName) {
        String name = FileNameUtils.getBaseName(fileName);
        String extension = FileNameUtils.getExtension(fileName);
        return name.concat("_").concat(String.valueOf(UUID.randomUUID())).concat(".")
            .concat(extension);
    }
}
