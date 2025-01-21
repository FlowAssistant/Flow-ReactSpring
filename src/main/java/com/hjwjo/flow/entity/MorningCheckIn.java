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

    @Lob // 긴 텍스트 데이터를 저장하기 위한 애노테이션
    private String responses;

    private String recommendedActivity;
}
