package com.hjwjo.flow.entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "happiness_trackers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HappinessTracker {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "tracker_id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column
    private Integer weekNumber;

    @Column
    private Integer happinessScore;

    private LocalDateTime createdAt = LocalDateTime.now();
}
