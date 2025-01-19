package com.hjwjo.flow.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class EmotionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String emotion;

    @Column(nullable = false)
    private String recommendedActivity;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}
