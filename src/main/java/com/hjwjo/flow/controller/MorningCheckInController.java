package com.hjwjo.flow.controller;

import com.hjwjo.flow.entity.MorningCheckIn;
import com.hjwjo.flow.service.MorningCheckInService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class MorningCheckInController {

    private final MorningCheckInService service;

    public MorningCheckInController(MorningCheckInService service) {
        this.service = service;
    }

    @PostMapping("/morning-checkin")
    public ResponseEntity<?> morningCheckIn(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String emotion = request.get("emotion");

        MorningCheckIn checkIn = service.handleCheckIn(username, emotion);
        return ResponseEntity.ok(Map.of(
                "message", "체크인에 성공했습니다.",
                "recommendedActivity", checkIn.getRecommendedActivity()
        ));
    }
}
