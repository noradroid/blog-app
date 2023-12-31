package com.example.blog.resource;

import com.example.blog.service.LoggedInService;
import com.example.blog.service.dto.loggedin.LoginRequestDto;
import com.example.blog.service.dto.user.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class LoggedInResource {

    @Autowired
    private LoggedInService loggedInService;

    @PostMapping()
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserDto> loginUser(@RequestBody LoginRequestDto req) {
        return new ResponseEntity<>(loggedInService.loginUser(req), HttpStatus.OK);
    }

    @PostMapping("/{username}")
    @ResponseStatus(HttpStatus.OK)
    public void logoutUser(@PathVariable("username") String username) {
        loggedInService.logoutUser(username);
    }

    @GetMapping("/{username}")
    public ResponseEntity<Boolean> isUserLoggedIn(@PathVariable("username") String username) {
        return new ResponseEntity<Boolean>(loggedInService.isUserLoggedIn(username), HttpStatus.OK);
    }

    @DeleteMapping("/sessions")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAllSessions() {
        loggedInService.deleteAllSessions();
    }
}
