package com.example.blog.service.dto.loggedin;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LoginRequestDto {
    @JsonProperty(required = true)
    String username;

    @JsonProperty(required = true)
    String password;
}
