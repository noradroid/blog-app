package com.example.blog.service;

import com.example.blog.domain.Post;
import com.example.blog.domain.User;

public class PostHelper {

    public static Post mockPost(User user, Boolean active) {
        Post post = new Post();
        post.setId(EntityIdHelper.getId());
        post.setTitle("First post");
        post.setContent("This is my first post");
        post.setUser(user);
        post.setActive(active);
        return post;
    }
}
