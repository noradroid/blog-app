package com.example.blog.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UpdateUserRequestDto {

    @JsonProperty(required = false)
    public String username;

    @JsonProperty(required = false)
    public String email;
}
