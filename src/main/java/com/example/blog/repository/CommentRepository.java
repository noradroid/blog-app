package com.example.blog.repository;

import com.example.blog.domain.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByRecordStatusValueNot(int recordStatusValue);

    List<Comment> findAllByParentIdAndRecordStatusValueNot(Long parentId, int recordStatusValue);

    List<Comment> findAllByPostIdAndRecordStatusValueNot(Long postId, int recordStatusValue);

    List<Comment> findAllByPostIdAndParentId(Long postId, Long parentId);
}
