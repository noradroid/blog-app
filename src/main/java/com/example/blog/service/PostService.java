package com.example.blog.service;

import com.example.blog.constants.StatusConstants;
import com.example.blog.domain.Post;
import com.example.blog.domain.User;
import com.example.blog.exception.EntityDeletedException;
import com.example.blog.exception.ResponseCodeException;
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

@Service
public class PostService {

    @Autowired
    UserService userService;

    @Autowired
    PostRepository postRepository;

    /**
     * Used for feed, get only active posts.
     */
    @Transactional(readOnly = true)
    public List<PostDto> getAllPosts() {
        return postRepository.findAllByActive(StatusConstants.ACTIVE).stream().map(PostDto::new)
            .toList();
    }

    /**
     * Used for feed, get only active posts.
     */
    @Transactional(readOnly = true)
    public List<PostDto> getPostsByUser(Long userId) {
        return postRepository.findAllByUserIdAndActiveTrue(userId).stream().map(PostDto::new)
            .toList();
    }

    @Transactional(readOnly = true)
    public PostDto getPostById(Long id) {
        Post post = getPost(id);
        return new PostDto(post);
    }

    @Transactional(readOnly = true)
    public Post getPost(Long id) {
        Optional<Post> opt = postRepository.findById(id);
        if (opt.isEmpty()) {
            throw new ResponseCodeException(HttpStatus.NOT_FOUND, "Post is not found");
        }
        return opt.get();
    }

    @Transactional(readOnly = false)
    public PostDto createPost(CreatePostRequestDto req) {
        if (StringUtils.isEmpty(req.getTitle()) || StringUtils.isEmpty(req.getContent())
            || req.getUserId() == null) {
            throw new ResponseCodeException(HttpStatus.BAD_REQUEST,
                "Title, content and userId must be provided"
            );
        }
        User user = userService.getUser(req.getUserId());
        if (isTitleTaken(req.getTitle(), user)) {
            throw new ResponseCodeException(HttpStatus.CONFLICT,
                "Title is taken, please use another title"
            );
        }
        Post post = new Post();
        post.setTitle(req.getTitle());
        post.setContent(req.getContent());
        post.setUser(user);
        post.setActive(StatusConstants.ACTIVE);
        postRepository.save(post);
        return new PostDto(post);
    }

    @Transactional(readOnly = false)
    public PostDto updatePost(Long id, UpdatePostRequestDto req) {
        if (StringUtils.isEmpty(req.getTitle()) || StringUtils.isEmpty(req.getContent())) {
            throw new ResponseCodeException(HttpStatus.BAD_REQUEST,
                "Title and content must be provided"
            );
        }
        Post post = getPost(id);
        if (post.getActive().equals(StatusConstants.DELETED)) {
            throw new EntityDeletedException("Post has been deleted");
        }
        if (!req.getTitle().equals(post.getTitle()) && isTitleTaken(req.getTitle(),
            post.getUser()
        )) {
            throw new ResponseCodeException(HttpStatus.CONFLICT,
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
            post.setActive(StatusConstants.DELETED);
            post.setLastModifiedDate(Instant.now());
            postRepository.save(post);
        } catch (Exception e) {
        }

    }

    @Transactional(readOnly = true)
    public boolean isTitleTaken(String title, User user) {
        return postRepository.existsByTitleIgnoreCaseAndUserAndActiveTrue(title, user);
    }
}
