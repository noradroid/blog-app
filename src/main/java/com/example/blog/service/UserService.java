package com.example.blog.service;

import com.example.blog.domain.User;
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
import org.springframework.web.server.ResponseStatusException;

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
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User is not found");
        }
        return opt.get();
    }

    @Transactional(readOnly = false)
    public User createUser(CreateUserRequestDto req) {
        if (StringUtils.isEmpty(req.username)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username not provided.");
        }
        if (!isUsernameAvailable(req.username)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username is taken, please choose another name.");
        }
        User user = new User();
        user.setUsername(req.username);
        user.setEmail(req.email);
        userRepository.save(user);
        return user;
    }

    @Transactional(readOnly = false)
    public User updateUser(Long id, UpdateUserRequestDto req) {
        User user = getUser(id);
        if (StringUtils.isEmpty(req.username)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username must be provided");
        }
        if (!req.username.equals(user.getUsername()) && !isUsernameAvailable(req.username)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username is taken, please choose another name.");
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
    public boolean isUsernameAvailable(String username) {
        return !userRepository.existsByUsernameIgnoreCase(username);
    }
}
