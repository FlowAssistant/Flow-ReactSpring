package com.hjwjo.flow.controller;

import com.hjwjo.flow.entity.User;
import com.hjwjo.flow.repository.UserRepository;
import com.hjwjo.flow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        // 사용자 중복 확인
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        // 비밀번호를 암호화하지 않고 저장
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    // 사용자 프로필 조회
    @GetMapping("/profile")
    public Optional<User> getProfile(@RequestParam String username) {
        return userService.getUserByUsername(username);
    }

    // 사용자 프로필 수정
    @PutMapping("/profile")
    public User updateProfile(@RequestParam String username, @RequestBody User updatedUser) {
        return userService.updateUser(username, updatedUser);
    }
}
