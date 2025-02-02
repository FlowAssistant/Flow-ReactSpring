package com.hjwjo.flow.service;

import com.hjwjo.flow.entity.User;
import com.hjwjo.flow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.*;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final String uploadDir = "src/main/resources/static/uploads/profile-images/";

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 사용자 조회
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // 사용자 정보 업데이트
    @Transactional
    public User updateUser(String username, String name, String email, MultipartFile profileImage) throws IOException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!email.equals(user.getEmail()) && userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email is already in use");
        }

        user.setUsername(username);
        user.setEmail(email);

        // 프로필 이미지 업로드 처리
        if (profileImage != null && !profileImage.isEmpty()) {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            String filename = UUID.randomUUID() + "_" + profileImage.getOriginalFilename();
            Path filePath = uploadPath.resolve(filename);
            Files.copy(profileImage.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            user.setProfileImg("/uploads/profile-images/" + filename);
        }

        return userRepository.save(user);
    }
}
