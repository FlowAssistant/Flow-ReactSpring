package com.hjwjo.flow.controller;

import com.hjwjo.flow.entity.User;
import com.hjwjo.flow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private final String uploadDir = "src/main/resources/static/uploads/profile-images/";

    // 사용자 정보 조회
    @GetMapping("/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 사용자 정보 업데이트
    @PutMapping("/{username}")
    public ResponseEntity<User> updateUser(
            @PathVariable String username,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage
    ) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (!userOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOptional.get();

        // 이메일 유효성 검사 추가 (중복 방지)
        if (!email.equals(user.getEmail()) && userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body(null);
        }

        user.setName(name);
        user.setEmail(email);

        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                String filename = username + "_" + profileImage.getOriginalFilename();
                Path filePath = uploadPath.resolve(filename);
                Files.write(filePath, profileImage.getBytes());
                user.setProfileImageUrl("/uploads/profile-images/" + filename);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body(null);
            }
        }

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    // 추가 엔드포인트
    @GetMapping("/current")
    public ResponseEntity<User> getCurrentUser(@RequestParam String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
