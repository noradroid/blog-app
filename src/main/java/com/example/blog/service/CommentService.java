package com.example.blog.service;

import com.example.blog.domain.Comment;
import com.example.blog.domain.Post;
import com.example.blog.enums.RecordStatus;
import com.example.blog.repository.CommentRepository;
import com.example.blog.service.dto.comment.CommentDto;
import com.example.blog.service.dto.comment.CreateCommentRequestDto;
import com.example.blog.service.dto.comment.UpdateCommentRequestDto;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserService userService;

    @Autowired
    PostService postService;

    @Transactional(readOnly = true)
    public List<CommentDto> getComments() {
        return commentRepository.findAllByRecordStatusValueNot(RecordStatus.DELETED.getValue())
            .stream().map(CommentDto::new).toList();
    }

    @Transactional(readOnly = true)
    public List<CommentDto> getCommentsByPost(Long postId) {
        return commentRepository.findAllByPostIdAndRecordStatusValueNot(postId,
            RecordStatus.DELETED.getValue()
        ).stream().map(CommentDto::new).toList();
    }

    @Transactional(readOnly = true)
    public List<CommentDto> getCommentsByParent(Long parentId) {
        return commentRepository.findAllByParentIdAndRecordStatusValueNot(parentId,
            RecordStatus.DELETED.getValue()
        ).stream().map(CommentDto::new).toList();
    }

    @Transactional(readOnly = true)
    public Comment getComment(Long id) {
        Optional<Comment> opt = commentRepository.findById(id);
        if (opt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment is not found");
        }
        return opt.get();
    }

    @Transactional(readOnly = false)
    public CommentDto createComment(CreateCommentRequestDto req) {
        if (req.getPostId() == null && req.getParentId() == null || StringUtils.isEmpty(
            req.getContent()) || req.getUserId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "One of post id or parent id, along with User id and content must be provided"
            );
        }
        Comment comment = new Comment();
        if (req.getParentId() != null) {
            Comment parent = getComment(req.getParentId());
            Post post = parent.getPost();
            comment.setPost(post);
            comment.setParent(parent);
        } else {
            comment.setPost(postService.getPost(req.getPostId()));
        }
        comment.setUser(userService.getUser(req.getUserId()));
        comment.setContent(req.getContent());
        comment.setRecordStatusValue(RecordStatus.ACTIVE.getValue());
        commentRepository.save(comment);
        return new CommentDto(comment);
    }

    @Transactional(readOnly = false)
    public CommentDto updateComment(Long id, UpdateCommentRequestDto req) {
        if (StringUtils.isEmpty(req.getContent())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Content cannot be empty");
        }
        Comment comment = getComment(id);
        comment.setContent(req.getContent());
        comment.setLastModifiedDate(Instant.now());
        commentRepository.save(comment);
        return new CommentDto(comment);
    }

    @Transactional(readOnly = false)
    public void deleteComment(Long id) {
        try {
            Comment comment = getComment(id);
            if (!comment.getRecordStatusValue().equals(RecordStatus.DELETED.getValue())) {
                comment.setRecordStatusValue(RecordStatus.DELETED.getValue());
                comment.setLastModifiedDate(Instant.now());
                commentRepository.save(comment);
            }
        } catch (Exception exception) {
        }
    }
}
