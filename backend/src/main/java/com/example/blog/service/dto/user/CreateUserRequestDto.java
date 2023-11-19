package com.example.blog.service.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CreateUserRequestDto {

    @JsonProperty(required = true)
    public String username;

    @JsonProperty(required = false)
    public String email;
}
