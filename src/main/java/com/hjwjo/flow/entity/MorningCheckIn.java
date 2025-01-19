package com.hjwjo.flow.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class MorningCheckIn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String emotion;
    private String recommendedActivity;
}
