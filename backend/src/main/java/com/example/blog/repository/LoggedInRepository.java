package com.example.blog.repository;

import com.example.blog.domain.LoggedIn;
import com.example.blog.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoggedInRepository extends JpaRepository<LoggedIn, Long> {

    Optional<LoggedIn> findByUser(User user);
}
