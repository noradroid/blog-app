package com.example.blog.exception;

import org.springframework.http.HttpStatus;

public class ResponseCodeException extends RuntimeException {
    private HttpStatus statusCode;

    public ResponseCodeException(HttpStatus statusCode, String message) {
        super(message);
        this.statusCode = statusCode;
    }

    public ResponseCodeException(HttpStatus statusCode, String message, Throwable error) {
        super(message, error);
        this.statusCode = statusCode;
    }

    public HttpStatus getStatusCode() {
        return statusCode;
    }
}
