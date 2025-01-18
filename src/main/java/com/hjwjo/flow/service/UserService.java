package com.hjwjo.flow.service;

import com.hjwjo.flow.entity.User;
import com.hjwjo.flow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 사용자 조회
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // 사용자 업데이트
    public User updateUser(String username, User updatedUser) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setUsername(updatedUser.getUsername());
            user.setPassword(updatedUser.getPassword());
            return userRepository.save(user);
        }
        throw new IllegalArgumentException("User not found");
    }
}
