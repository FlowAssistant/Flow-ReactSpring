package com.hjwjo.flow.service;

import com.hjwjo.flow.entity.Mood;
import com.hjwjo.flow.entity.User;
import com.hjwjo.flow.repository.MoodRepository;
import com.hjwjo.flow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MoodService {

    private final MoodRepository moodRepository;
    private final UserRepository userRepository; // 🔹 UserRepository 추가

    @Autowired
    public MoodService(MoodRepository moodRepository, UserRepository userRepository) {
        this.moodRepository = moodRepository;
        this.userRepository = userRepository;
    }

    public Mood saveMood(UUID userId, String moodType, Integer moodIntensity, String note) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다: " + userId));

        Mood mood = new Mood();
        mood.setUser(user); // 🔹 UUID가 아니라 User 객체를 설정해야 함
        mood.setMoodType(moodType);
        mood.setMoodIntensity(moodIntensity);
        mood.setNote(note);
        return moodRepository.save(mood);
    }
}
