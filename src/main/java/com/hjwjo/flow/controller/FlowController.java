package com.hjwjo.flow.controller;

import com.hjwjo.flow.entity.*;
import com.hjwjo.flow.service.FlowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FlowController {

    private final FlowService flowService;

    public FlowController(FlowService flowService) {
        this.flowService = flowService;
    }

    // Mood 기록 추가
    @PostMapping("/mood")
    public ResponseEntity<Mood> saveMood(@RequestBody Mood mood) {
        return ResponseEntity.ok(flowService.saveMood(mood));
    }

    // Activity 기록 추가
    @PostMapping("/activity")
    public ResponseEntity<Activity> saveActivity(@RequestBody Activity activity) {
        return ResponseEntity.ok(flowService.saveActivity(activity));
    }

    // Chat 기록 추가
    @PostMapping("/chat")
    public ResponseEntity<ChatHistory> saveChat(@RequestBody ChatHistory chat) {
        return ResponseEntity.ok(flowService.saveChat(chat));
    }

    // AI_Feedback 기록 추가
    @PostMapping("/feedback")
    public ResponseEntity<AIFeedback> saveFeedback(@RequestBody AIFeedback feedback) {
        return ResponseEntity.ok(flowService.saveFeedback(feedback));
    }
}
