package com.example.blog.service;

import com.example.blog.domain.User;

public class UserHelper {

    public static User mockUserA() {
        User user = new User();
        user.setId(EntityIdHelper.getId());
        user.setUsername("testUserA");
        user.setEmail("emailA@email.com");
        return user;
    }

    public static User mockUserB() {
        User user = new User();
        user.setId(EntityIdHelper.getId());
        user.setUsername("testUserB");
        user.setEmail("emailB@email.com");
        return user;
    }
}
