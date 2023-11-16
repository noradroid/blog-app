package com.example.blog.service.dto.comment;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UpdateCommentRequestDto {
    @JsonProperty(required = true)
    private String content;
}
