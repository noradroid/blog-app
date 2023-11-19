package com.example.blog.service.dto.post;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UpdatePostRequestDto {
    @JsonProperty(required = true)
    String title;

    @JsonProperty(required = true)
    String content;
}
