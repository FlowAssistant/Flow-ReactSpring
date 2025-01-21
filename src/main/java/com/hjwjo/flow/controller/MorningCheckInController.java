package com.hjwjo.flow.controller;

import com.hjwjo.flow.entity.MorningCheckIn;
import com.hjwjo.flow.service.MorningCheckInService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MorningCheckInController {

    private final MorningCheckInService service;

    public MorningCheckInController(MorningCheckInService service) {
        this.service = service;
    }

    @PostMapping("/morning-checkin")
    public ResponseEntity<?> morningCheckIn(@RequestBody Map<String, Object> request) {
        String username = (String) request.get("username");
        List<String> responses = (List<String>) request.get("responses"); // 여러 응답을 받음

        MorningCheckIn checkIn = service.handleCheckIn(username, responses);
        return ResponseEntity.ok(Map.of(
                "message", "체크인에 성공했습니다.",
                "recommendedActivity", checkIn.getRecommendedActivity()
        ));
    }
}
