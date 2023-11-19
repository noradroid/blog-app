package com.example.blog.repository;

import com.example.blog.domain.Post;
import com.example.blog.domain.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByActive(boolean active);

    List<Post> findAllByUserIdAndActiveTrue(Long parentId);

    boolean existsByTitleIgnoreCaseAndUserAndActiveTrue(
        String title,
        User user
    );
}
