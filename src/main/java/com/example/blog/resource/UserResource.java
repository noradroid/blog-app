package com.example.blog.resource;

import com.example.blog.domain.User;
import com.example.blog.service.UserService;
import com.example.blog.service.dto.CreateUserRequestDto;
import com.example.blog.service.dto.CreateUserResponseDto;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserResource {

    @Autowired
    UserService userService;

    @GetMapping()
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<CreateUserResponseDto> createUser(@RequestBody CreateUserRequestDto req) {
        return new ResponseEntity<>(userService.createUser(req), HttpStatus.CREATED);
    }
}
