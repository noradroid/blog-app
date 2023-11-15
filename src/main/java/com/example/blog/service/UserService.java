package com.example.blog.service;

import com.example.blog.domain.User;
import com.example.blog.repository.UserRepository;
import com.example.blog.service.dto.CreateUserRequestDto;
import com.example.blog.service.dto.CreateUserResponseDto;
import java.util.List;
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

    @Transactional(readOnly = false)
    public CreateUserResponseDto createUser(CreateUserRequestDto req) {
        if (req.username == null || req.username.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username not provided.");
        }
        if (!isUsernameAvailable(req.username)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username is taken, please choose another name.");
        }
        User user = new User();
        user.setUsername(req.username);
        user.setEmail(req.email);
        userRepository.save(user);
        return new CreateUserResponseDto(user);
    }

    @Transactional(readOnly = true)
    public boolean isUsernameAvailable(String username) {
        return !userRepository.existsByUsernameIgnoreCase(username);
    }
}
