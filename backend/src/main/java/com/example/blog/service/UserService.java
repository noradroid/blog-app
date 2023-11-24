package com.example.blog.service;

import com.example.blog.domain.User;
import com.example.blog.exception.ResponseCodeException;
import com.example.blog.repository.UserRepository;
import com.example.blog.service.dto.user.CreateUserRequestDto;
import com.example.blog.service.dto.user.UpdateUserRequestDto;
import java.util.List;
import java.util.Optional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public User getUser(Long id) {
        Optional<User> opt = userRepository.findById(id);
        if (opt.isEmpty()) {
            throw new ResponseCodeException(HttpStatus.NOT_FOUND, "User is not found");
        }
        return opt.get();
    }

    @Transactional(readOnly = true)
    public User getUserByUsername(String username) {
        Optional<User> opt = userRepository.findByUsernameIgnoreCase(username);
        if (opt.isEmpty()) {
            throw new ResponseCodeException(HttpStatus.NOT_FOUND, "User is not found");
        }
        return opt.get();
    }

    @Transactional(readOnly = false)
    public User createUser(CreateUserRequestDto req) {
        if (StringUtils.isEmpty(req.username)) {
            throw new ResponseCodeException(HttpStatus.BAD_REQUEST, "Username not provided");
        }
        if (StringUtils.isEmpty(req.passwordHash)) {
            throw new ResponseCodeException(HttpStatus.BAD_REQUEST, "Password not provided");
        }
        if (isUsernameTaken(req.username)) {
            throw new ResponseCodeException(HttpStatus.CONFLICT,
                "Username is taken, please choose another name"
            );
        }
        User user = new User();
        user.setUsername(req.username);
        user.setEmail(req.email);
        user.setPasswordHash(req.passwordHash);
        userRepository.save(user);
        return user;
    }

    @Transactional(readOnly = false)
    public User updateUser(Long id, UpdateUserRequestDto req) {
        User user = getUser(id);
        if (StringUtils.isEmpty(req.username)) {
            throw new ResponseCodeException(HttpStatus.BAD_REQUEST, "Username must be provided");
        }
        if (StringUtils.isEmpty(req.passwordHash)) {
            throw new ResponseCodeException(HttpStatus.BAD_REQUEST, "Password must be provided");
        }
        if (!req.username.equals(user.getUsername()) && isUsernameTaken(req.username)) {
            throw new ResponseCodeException(HttpStatus.CONFLICT,
                "Username is taken, please choose another name"
            );
        }
        user.setUsername(req.username);
        user.setEmail(req.email);

        userRepository.save(user);
        return user;
    }

    @Transactional(readOnly = false)
    public void deleteUser(Long id) {
        User user = getUser(id);
        userRepository.delete(user);
    }

    @Transactional(readOnly = true)
    public boolean isUsernameTaken(String username) {
        return userRepository.existsByUsernameIgnoreCase(username);
    }
}
