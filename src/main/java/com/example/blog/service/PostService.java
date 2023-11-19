package com.example.blog.service;

import com.example.blog.domain.Post;
import com.example.blog.domain.User;
import com.example.blog.enums.RecordStatus;
import com.example.blog.repository.PostRepository;
import com.example.blog.service.dto.post.CreatePostRequestDto;
import com.example.blog.service.dto.post.PostDto;
import com.example.blog.service.dto.post.UpdatePostRequestDto;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
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
        return postRepository.findAllByRecordStatusValueNot(RecordStatus.DELETED.getValue())
            .stream().map(PostDto::new).toList();
    }

    @Transactional(readOnly = true)
    public List<PostDto> getPostsByUser(Long userId) {
        return postRepository.findAllByUserIdAndRecordStatusValueNot(userId,
            RecordStatus.DELETED.getValue()
        ).stream().map(PostDto::new).toList();
    }

    @Transactional(readOnly = true)
    public Post getPost(Long id) {
        Optional<Post> opt = postRepository.findById(id);
        if (opt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post is not found");
        }
        return opt.get();
    }

    @Transactional(readOnly = false)
    public PostDto createPost(CreatePostRequestDto req) {
        if (StringUtils.isEmpty(req.getTitle()) || StringUtils.isEmpty(req.getContent())
            || req.getUserId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "Title, content and userId must be provided"
            );
        }
        User user = userService.getUser(req.getUserId());
        if (isTitleTaken(req.getTitle(), user)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                "Title is taken, please use another title"
            );
        }
        Post post = new Post();
        post.setTitle(req.getTitle());
        post.setContent(req.getContent());
        post.setUser(user);
        post.setRecordStatusValue(RecordStatus.ACTIVE.getValue());
        postRepository.save(post);
        return new PostDto(post);
    }

    @Transactional(readOnly = false)
    public PostDto updatePost(Long id, UpdatePostRequestDto req) {
        Post post = getPost(id);
        if (StringUtils.isEmpty(req.getTitle()) || StringUtils.isEmpty(req.getContent())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "Title and content must be provided"
            );
        }
        if (!req.getTitle().equals(post.getTitle()) && isTitleTaken(req.getTitle(),
            post.getUser()
        )) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                "Title is taken, please use another title"
            );
        }
        post.setTitle(req.getTitle());
        post.setContent(req.getContent());
        post.setLastModifiedDate(Instant.now());
        postRepository.save(post);
        return new PostDto(post);
    }

    @Transactional(readOnly = false)
    public void deletePost(Long id) {
        try {
            Post post = getPost(id);
            post.setRecordStatusValue(RecordStatus.DELETED.getValue());
            post.setLastModifiedDate(Instant.now());
            postRepository.save(post);
        } catch (Exception e) {
        }

    }

    @Transactional(readOnly = true)
    public boolean isTitleTaken(String title, User user) {
        return postRepository.existsByTitleIgnoreCaseAndUserAndRecordStatusValueNot(title, user,
            RecordStatus.DELETED.getValue()
        );
    }
}
