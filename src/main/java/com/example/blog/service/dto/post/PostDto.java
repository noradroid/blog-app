package com.example.blog.service.dto.post;

import com.example.blog.domain.Post;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.Instant;
import lombok.Data;

@Data
public class PostDto {

    @JsonProperty
    Long id;

    @JsonProperty
    String title;

    @JsonProperty
    String content;

    @JsonProperty
    Long userId;

    @JsonProperty
    Instant createdDate;

    @JsonProperty
    Instant lastModifiedDate;

    public PostDto(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.userId = post.getUser().getId();
        this.createdDate = post.getCreatedDate();
        this.lastModifiedDate = post.getLastModifiedDate();
    }

}
