package com.example.blog.service;

import com.example.blog.domain.Comment;
import com.example.blog.domain.Post;
import com.example.blog.domain.User;

public class CommentHelper {

    public static final String content = "Content";

    public static Comment mockComment(User user, Post post, Comment parent, Boolean active) {
        Comment comment = new Comment();
        comment.setId(EntityIdHelper.getId());
        comment.setContent(content);
        comment.setPost(post);
        comment.setUser(user);
        comment.setParent(parent);
        comment.setActive(active);
        return comment;
    }
}
