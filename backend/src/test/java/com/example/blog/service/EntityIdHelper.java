package com.example.blog.service;

public class EntityIdHelper {
    private static Long id = Long.valueOf(1);

    public static Long getId() {
        return id++;
    }
}
