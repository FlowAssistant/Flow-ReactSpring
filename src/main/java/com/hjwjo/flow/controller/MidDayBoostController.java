package com.hjwjo.flow.controller;

import com.hjwjo.flow.entity.Activity;
import com.hjwjo.flow.service.ActivityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class MidDayBoostController {

    private final ActivityService activityService;

    public MidDayBoostController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @PostMapping("/midday-boost")
    public ResponseEntity<?> middayBoost(@RequestBody Map<String, Object> request) {
        UUID userId = UUID.fromString((String) request.get("userId"));
        String activityType = (String) request.get("activity");
        Integer satisfaction = (Integer) request.get("satisfaction");
        Integer duration = (Integer) request.get("duration");

        Activity activity = activityService.saveActivity(userId, activityType, satisfaction, duration);

        return ResponseEntity.ok(Map.of(
                "message", "중간 체크 기록 완료",
                "activityType", activity.getActivityType()
        ));
    }
}
