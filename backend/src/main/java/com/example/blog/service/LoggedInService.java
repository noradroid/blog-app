package com.example.blog.service;

import com.example.blog.domain.LoggedIn;
import com.example.blog.domain.User;
import com.example.blog.exception.ResponseCodeException;
import com.example.blog.repository.LoggedInRepository;
import com.example.blog.service.dto.loggedin.LoginRequestDto;
import com.example.blog.service.dto.user.UserDto;
import com.example.blog.util.PasswordUtil;
import java.util.Optional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LoggedInService {

    @Autowired
    private LoggedInRepository loggedInRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordUtil passwordUtil;

    @Transactional(readOnly = false)
    public UserDto loginUser(LoginRequestDto req) {
        if (StringUtils.isEmpty(req.getUsername())) {
            throw new ResponseCodeException(HttpStatus.BAD_REQUEST, "Please provide a username.");
        }
        if (StringUtils.isEmpty(req.getPassword())) {
            throw new ResponseCodeException(HttpStatus.BAD_REQUEST, "Please provide a password.");
        }
        User user = userService.getUserByUsername(req.getUsername());
        if (passwordUtil.matchPassword(req.getPassword(), user.getPasswordHash())) {
            throw new ResponseCodeException(HttpStatus.UNAUTHORIZED, "Invalid user credentials.");
        }
        LoggedIn loggedIn = new LoggedIn();
        loggedIn.setUser(user);
        loggedInRepository.save(loggedIn);
        return new UserDto(user);
    }

    @Transactional(readOnly = false)
    public void logoutUser(String username) {
        if (StringUtils.isEmpty(username)) {
            throw new ResponseCodeException(HttpStatus.BAD_REQUEST, "Please provide a user.");
        }
        User user = userService.getUserByUsername(username);
        Optional<LoggedIn> opt = loggedInRepository.findByUser(user);
        if (!opt.isEmpty()) {
            loggedInRepository.delete(opt.get());
        }
    }

    @Transactional(readOnly = true)
    public boolean isUserLoggedIn(String username) {
        if (StringUtils.isEmpty(username)) {
            throw new ResponseCodeException(HttpStatus.BAD_REQUEST, "Please provide a user.");
        }
        User user = userService.getUserByUsername(username);
        Optional<LoggedIn> opt = loggedInRepository.findByUser(user);
        return opt.isPresent();
    }

    @Transactional(readOnly = false)
    public void deleteAllSessions() {
        loggedInRepository.deleteAll();
    }
}
