package com.example.blog.resource;

import com.example.blog.service.PostService;
import com.example.blog.service.dto.post.CreatePostRequestDto;
import com.example.blog.service.dto.post.PostDto;
import com.example.blog.service.dto.post.UpdatePostRequestDto;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/posts")
public class PostResource {

    @Autowired
    PostService postService;

    @Operation(summary = "Get posts by user")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "OK"),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping()
    public ResponseEntity<List<PostDto>> getPosts(
        @RequestParam(value = "user", required = false) Long userId
    ) {
        if (userId == null) {
            return new ResponseEntity<>(postService.getAllPosts(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(postService.getPostsByUser(userId), HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPost(@PathVariable("id") Long id) {
        return new ResponseEntity<>(postService.getPostById(id), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<PostDto> createPost(@RequestBody CreatePostRequestDto req) {
        return new ResponseEntity<>(postService.createPost(req), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDto> updatePost(@PathVariable("id") Long id,
        @RequestBody UpdatePostRequestDto req
    ) {
        return new ResponseEntity<>(postService.updatePost(id, req), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable("id") Long id) {
        postService.deletePost(id);
    }

    @PostMapping("/image")
    public void uploadImage(@RequestParam("file") MultipartFile file) {
        postService.uploadFile(file);
    }
}
