package com.example.blog.service.dto.comment;

import com.example.blog.domain.Comment;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.Instant;
import lombok.Data;

@Data
public class CommentDto {
    @JsonProperty
    Long id;

    @JsonProperty
    String content;

    @JsonProperty
    Long userId;

    @JsonProperty
    Long postId;

    @JsonProperty
    Long parentId;

    @JsonProperty
    Instant createdDate;

    @JsonProperty
    Instant lastModifiedDate;

    public CommentDto(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.userId = comment.getUser().getId();
        this.postId = comment.getPost().getId();
        if (comment.getParent() != null) {
            this.parentId = comment.getParent().getId();
        }
        this.createdDate = comment.getCreatedDate();
        this.lastModifiedDate = comment.getLastModifiedDate();
    }
}
