package com.example.blog.enums;

/**
 * Database record status - active or deleted.
 */
public enum RecordStatus {

    ACTIVE(1),
    DELETED(0);

    private int value;

    private RecordStatus(int status) {
        this.value = status;
    }

    public int getValue() {
        return value;
    }
}
