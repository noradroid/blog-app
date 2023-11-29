package com.example.blog.service.dto.user;

import com.example.blog.domain.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserDto {
    @JsonProperty
    private Long id;

    @JsonProperty
    private String username;

    @JsonProperty
    private String email;

    public UserDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}
