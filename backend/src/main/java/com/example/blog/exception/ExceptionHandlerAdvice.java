package com.example.blog.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class ExceptionHandlerAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResponseCodeException.class)
    protected ProblemDetail handleResponseCodeException(
        ResponseCodeException ex
    ) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
            ex.getStatusCode(),
            ex.getMessage()
        );
        problemDetail.setTitle(ex.getMessage());
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
