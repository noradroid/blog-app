package com.example.blog.service.dto.comment;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CreateCommentRequestDto {
    @JsonProperty(required = false)
    private Long postId;

    @JsonProperty(required = false)
    private Long parentId;

    @JsonProperty(required = true)
    private String content;

    @JsonProperty(required = true)
    private Long userId;
}
