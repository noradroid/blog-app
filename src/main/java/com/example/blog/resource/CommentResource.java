package com.example.blog.resource;

import com.example.blog.domain.Comment;
import com.example.blog.service.CommentService;
import com.example.blog.service.dto.comment.CommentDto;
import com.example.blog.service.dto.comment.CreateCommentRequestDto;
import com.example.blog.service.dto.comment.UpdateCommentRequestDto;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comments")
public class CommentResource {

    @Autowired
    CommentService commentService;

    @GetMapping()
    public ResponseEntity<List<CommentDto>> getComments(
        @RequestParam(value = "postId", required = false) Long postId,
        @RequestParam(value = "parentId", required = false) Long parentId
        ) {
        List<CommentDto> comments;
        if (parentId != null) {
            comments = commentService.getCommentsByParent(parentId);
        } else if (postId != null) {
            comments = commentService.getCommentsByPost(postId);
        } else {
            comments = commentService.getComments();
        }
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<CommentDto> createComment(
        @RequestBody CreateCommentRequestDto req
    ) {
        return new ResponseEntity<>(commentService.createComment(req), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommentDto> updateComment(
        @PathVariable Long id,
        @RequestBody UpdateCommentRequestDto req
    ) {
        return new ResponseEntity<>(commentService.updateComment(id, req), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
    }
}
