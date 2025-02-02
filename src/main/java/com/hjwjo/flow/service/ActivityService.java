package com.hjwjo.flow.service;

import com.hjwjo.flow.entity.Activity;
import com.hjwjo.flow.entity.User;
import com.hjwjo.flow.repository.ActivityRepository;
import com.hjwjo.flow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository; // 🔹 UserRepository 추가

    @Autowired
    public ActivityService(ActivityRepository activityRepository, UserRepository userRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
    }

    public Activity saveActivity(UUID userId, String activityType, Integer satisfaction, Integer duration) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다: " + userId));

        Activity activity = new Activity();
        activity.setUser(user); // 🔹 UUID가 아니라 User 객체를 설정해야 함
        activity.setActivityType(activityType);
        activity.setSatisfaction(satisfaction);
        activity.setDuration(duration);
        return activityRepository.save(activity);
    }
}
