package com.hjwjo.flow.controller;

import com.hjwjo.flow.service.EveningReflectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class EveningReflectionController {

    private final EveningReflectionService service;

    public EveningReflectionController(EveningReflectionService service) {
        this.service = service;
    }

    @PostMapping("/evening-reflection")
    public ResponseEntity<?> eveningReflection(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String reflection = request.get("reflection");

        String feedback = service.generateFeedback(username, reflection);
        return ResponseEntity.ok(Map.of(
                "message", "저녁 반영 완료",
                "feedback", feedback
        ));
    }
}
