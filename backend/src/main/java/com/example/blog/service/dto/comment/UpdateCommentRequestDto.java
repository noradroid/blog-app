package com.example.blog.service.dto.comment;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateCommentRequestDto {
    @JsonProperty(required = true)
    private String content;
}
