package com.hjwjo.flow.controller;

import com.hjwjo.flow.entity.Mood;
import com.hjwjo.flow.service.MoodService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class MorningCheckInController {

    private final MoodService moodService;

    public MorningCheckInController(MoodService moodService) {
        this.moodService = moodService;
    }

    @PostMapping("/morning-checkin")
    public ResponseEntity<?> morningCheckIn(@RequestBody Map<String, Object> request) {
        UUID userId = UUID.fromString((String) request.get("userId"));
        String moodType = (String) request.get("mood");
        Integer moodIntensity = (Integer) request.get("intensity");
        String note = (String) request.get("note");

        Mood mood = moodService.saveMood(userId, moodType, moodIntensity, note);

        return ResponseEntity.ok(Map.of(
                "message", "아침 체크인 완료",
                "moodType", mood.getMoodType()
        ));
    }
}
