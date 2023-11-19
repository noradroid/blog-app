package com.example.blog.repository;

import com.example.blog.domain.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByActive(boolean active);

    List<Comment> findAllByParentId(Long parentId);

    List<Comment> findAllByPostIdAndParentIdIsNull(Long postId);

    List<Comment> findAllByUserIdAndActiveTrue(Long userId);

    List<Comment> findAllByPostIdAndParentId(Long postId, Long parentId);
}
