package com.example.blog.service;

import com.example.blog.constants.StatusConstants;
import com.example.blog.domain.Comment;
import com.example.blog.domain.Post;
import com.example.blog.exception.EntityDeletedException;
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

    /**
     * Used for feed, get only active comments.
     */
    @Transactional(readOnly = true)
    public List<CommentDto> getAllComments() {
        return commentRepository.findAllByActive(StatusConstants.ACTIVE)
            .stream().map(CommentDto::new).toList();
    }

    /**
     * Get comments regardless if active or not.
     */
    @Transactional(readOnly = true)
    public List<CommentDto> getTopLevelCommentsOfPost(Long postId) {
        return commentRepository.findAllByPostIdAndParentIdIsNull(postId).stream().map(CommentDto::new).toList();
    }

    /**
     * Get comments regardless if active or not.
     */
    @Transactional(readOnly = true)
    public List<CommentDto> getCommentsOfParent(Long parentId) {
        return commentRepository.findAllByParentId(parentId).stream().map(CommentDto::new).toList();
    }

    /**
     * Used for feed, get only active comments.
     */
    @Transactional(readOnly = true)
    public List<CommentDto> getCommentsByUser(Long userId) {
        return commentRepository.findAllByUserIdAndActiveTrue(userId).stream().map(CommentDto::new).toList();
    }

    @Transactional(readOnly = true)
    public CommentDto getCommentById(Long id) {
        Comment comment = getComment(id);
        return new CommentDto(comment);
    }

    /**
     * Get comment regardless if active or not.
     */
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
            validateCommentParentIsNotDeleted(parent);
            Post post = parent.getPost();
            validateCommentPostIsNotDeleted(post);
            comment.setPost(post);
            comment.setParent(parent);
        } else {
            Post post = postService.getPost(req.getPostId());
            validateCommentPostIsNotDeleted(post);
            comment.setPost(post);
        }
        comment.setUser(userService.getUser(req.getUserId()));
        comment.setContent(req.getContent());
        comment.setActive(StatusConstants.ACTIVE);
        commentRepository.save(comment);
        return new CommentDto(comment);
    }

    @Transactional(readOnly = false)
    public CommentDto updateComment(Long id, UpdateCommentRequestDto req) {
        if (StringUtils.isEmpty(req.getContent())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Content cannot be empty");
        }
        Comment comment = getComment(id);
        if (comment.getActive().equals(StatusConstants.DELETED)) {
            throw new EntityDeletedException("Comment has been deleted.");
        }
        comment.setContent(req.getContent());
        comment.setLastModifiedDate(Instant.now());
        commentRepository.save(comment);
        return new CommentDto(comment);
    }

    @Transactional(readOnly = false)
    public void deleteComment(Long id) {
        try {
            Comment comment = getComment(id);
            if (!comment.getActive().equals(StatusConstants.DELETED)) {
                comment.setActive(StatusConstants.DELETED);
                comment.setLastModifiedDate(Instant.now());
                commentRepository.save(comment);
            }
        } catch (Exception exception) {
        }
    }

    @Transactional(readOnly = true)
    private void validateCommentPostIsNotDeleted(Post post) {
        if (post.getActive().equals(StatusConstants.DELETED)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Post is not found."
            );
        }
    }

    @Transactional(readOnly = true)
    private void validateCommentParentIsNotDeleted(Comment parent) {
        if (parent.getActive().equals(StatusConstants.DELETED)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Parent comment is not found."
            );
        }
    }
}
