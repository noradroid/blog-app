package com.example.blog.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class ExceptionHandlerAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    protected ProblemDetail handleResponseStatusException(
        ResponseStatusException ex
    ) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
            ex.getStatusCode(),
            ex.getReason()
        );
        problemDetail.setTitle(ex.getReason());
        return problemDetail;
    }

    @ExceptionHandler(EntityDeletedException.class)
    protected ProblemDetail handleEntityDeletedException(
        EntityDeletedException ex
    ) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
            HttpStatus.BAD_REQUEST,
            ex.getMessage()
        );
        problemDetail.setTitle(ex.getMessage());
        return problemDetail;
    }
}
