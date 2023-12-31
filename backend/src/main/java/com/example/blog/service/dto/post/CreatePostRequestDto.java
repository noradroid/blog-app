package com.example.blog.service.dto.post;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CreatePostRequestDto {

    @JsonProperty(value = "title")
    String title;

    @JsonProperty(value = "description")
    String description;

    @JsonProperty(value = "content")
    String content;

    @JsonProperty(value = "userId")
    Long userId;
}
