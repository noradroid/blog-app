package com.example.blog.resource;

import com.example.blog.domain.Comment;
import com.example.blog.service.CommentService;
import com.example.blog.service.dto.comment.CommentDto;
import com.example.blog.service.dto.comment.CreateCommentRequestDto;
import com.example.blog.service.dto.comment.UpdateCommentRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(summary = "Get list of comments based on post or parent")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "OK")
    })
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

    @Operation(summary = "Create comment on a post or another comment")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "OK"),
        @ApiResponse(responseCode = "400", description = "Bad request"),
        @ApiResponse(responseCode = "404", description = "Post or parent does not exist")
    })
    @PostMapping()
    public ResponseEntity<CommentDto> createComment(
        @RequestBody CreateCommentRequestDto req
    ) {
        return new ResponseEntity<>(commentService.createComment(req), HttpStatus.CREATED);
    }

    @Operation(summary = "Update comment content")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "OK"),
        @ApiResponse(responseCode = "400", description = "Bad request"),
        @ApiResponse(responseCode = "404", description = "Comment does not exist")
    })
    @PutMapping("/{id}")
    public ResponseEntity<CommentDto> updateComment(
        @PathVariable Long id,
        @RequestBody UpdateCommentRequestDto req
    ) {
        return new ResponseEntity<>(commentService.updateComment(id, req), HttpStatus.OK);
    }

    @Operation(summary = "Delete comment")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Comment does not exist")
    })
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
    }
}
