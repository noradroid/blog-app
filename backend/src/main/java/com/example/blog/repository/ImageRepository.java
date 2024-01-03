package com.example.blog.repository;

import com.example.blog.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    boolean existsByPath(String path);
}
