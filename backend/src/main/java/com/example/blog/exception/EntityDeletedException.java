package com.example.blog.exception;

/**
 * This exception is thrown when a requested entity is marked
 * as deleted in the database but not physically deleted.
 */
public class EntityDeletedException extends RuntimeException {
    public EntityDeletedException(String message) {
        super(message);
    }

    public EntityDeletedException(String message, Throwable error) {
        super(message, error);
    }
}
