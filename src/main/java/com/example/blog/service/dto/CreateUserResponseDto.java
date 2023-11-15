package com.example.blog.service.dto;

import com.example.blog.domain.User;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CreateUserResponseDto {
    @JsonProperty
    Long id;

    @JsonProperty
    String username;

    public CreateUserResponseDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
    }
}
