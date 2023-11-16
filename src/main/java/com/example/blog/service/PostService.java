package com.example.blog.service;

import com.example.blog.domain.Post;
import com.example.blog.repository.PostRepository;
import com.example.blog.service.dto.post.CreatePostRequestDto;
import com.example.blog.service.dto.post.PostDto;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PostService {

    @Autowired
    UserService userService;

    @Autowired
    PostRepository postRepository;

    @Transactional(readOnly = true)
    public List<PostDto> getPosts() {
        return postRepository.findAll().stream().map(PostDto::new).toList();
    }

    @Transactional(readOnly = true)
    public List<PostDto> getPostsByUser(Long userId) {
        return postRepository.findAllByUserId(userId).stream().map(PostDto::new).toList();
    }

    @Transactional(readOnly = false)
    public PostDto createPost(CreatePostRequestDto req) {
        if (StringUtils.isEmpty(req.getTitle()) || StringUtils.isEmpty(req.getContent()) || req.getUserId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Title, content and userId must be provided");
        }
        Post post = new Post();
        post.setTitle(req.getTitle());
        post.setContent(req.getContent());
        post.setUser(userService.getUser(req.getUserId()));
        postRepository.save(post);
        return new PostDto(post);
    }
}
