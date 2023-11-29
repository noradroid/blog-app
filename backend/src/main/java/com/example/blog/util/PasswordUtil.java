package com.example.blog.util;

import java.nio.charset.StandardCharsets;
import org.springframework.stereotype.Component;
import org.springframework.util.DigestUtils;

/**
 * Insecure password hash utility.
 */
@Component
public class PasswordUtil {

    public String hashPassword(String password) {
        return DigestUtils.md5Digest(password.getBytes(StandardCharsets.UTF_8)).toString();
    }

    public boolean matchPassword(String password, String hash) {
        return DigestUtils.md5Digest(password.getBytes(StandardCharsets.UTF_8)).toString().equals(hash);
    }
}
