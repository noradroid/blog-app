package com.example.blog.resource;

import com.example.blog.service.PostService;
import com.example.blog.service.dto.post.CreatePostRequestDto;
import com.example.blog.service.dto.post.PostDto;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
public class PostResource {

    @Autowired
    PostService postService;

    @GetMapping()
    public ResponseEntity<List<PostDto>> getPosts(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            return new ResponseEntity<>(postService.getPostsByUser(userId), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(postService.getPosts(), HttpStatus.OK);
        }
    }

    @PostMapping()
    public ResponseEntity<PostDto> createPost(@RequestBody CreatePostRequestDto req) {
        return new ResponseEntity<>(postService.createPost(req), HttpStatus.CREATED);
    }

}
