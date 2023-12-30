package com.example.blog.exception;

public class FileNotFoundException extends NotFoundException {

    public FileNotFoundException() {
        super();
    }

    public FileNotFoundException(String fileName) {
        super("File ".concat(fileName).concat(" does not exist"));
    }
}
