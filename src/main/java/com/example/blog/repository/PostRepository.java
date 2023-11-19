package com.example.blog.repository;

import com.example.blog.domain.Post;
import com.example.blog.domain.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByRecordStatusValueNot(int recordStatusValue);

    List<Post> findAllByUserIdAndRecordStatusValueNot(Long parentId, int recordStatusValue);

    boolean existsByTitleIgnoreCaseAndUserAndRecordStatusValueNot(
        String title,
        User user,
        int recordStatusValue
    );
}
