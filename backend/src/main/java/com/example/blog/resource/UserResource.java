package com.example.blog.resource;

import com.example.blog.service.CommentService;
import com.example.blog.service.UserService;
import com.example.blog.service.dto.comment.CommentDto;
import com.example.blog.service.dto.user.CreateUserRequestDto;
import com.example.blog.service.dto.user.UpdateUserRequestDto;
import com.example.blog.service.dto.user.UserDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserResource {

    @Autowired
    UserService userService;

    @Autowired
    CommentService commentService;

    @GetMapping()
    public ResponseEntity<List<UserDto>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @Operation(summary = "Get user by username")
    @GetMapping("/username/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable("username") String username) {
        return new ResponseEntity<>(userService.getUserDtoByUsername(username), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<UserDto> createUser(@RequestBody CreateUserRequestDto req) {
        return new ResponseEntity<>(userService.createUser(req), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Long id, @RequestBody UpdateUserRequestDto req) {
        return new ResponseEntity<>(userService.updateUser(id, req), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
    }

    @Operation(summary = "Get comments by user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/{id}/comments")
    public ResponseEntity<List<CommentDto>> getUserComments(@PathVariable("id") Long id) {
        return new ResponseEntity<>(commentService.getCommentsByUser(id), HttpStatus.OK);
    }
}
