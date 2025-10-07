package com.example.backend.event.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.*;

@Entity @Table(name = "events") // tránh keyword 'event' của MySQL
@Getter @Setter @NoArgsConstructor
public class EventEntity {
    @Id @Column(columnDefinition = "char(36)") private String id;

    @PrePersist void prePersist() {
        if (id == null) id = java.util.UUID.randomUUID().toString();
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (updatedAt == null) updatedAt = createdAt;
    }
    @PreUpdate void preUpdate() { updatedAt = LocalDateTime.now(); }

    @Column(nullable=false) private String title;
    @Column(nullable=false, unique=true, length=191) private String slug;
    @Column(columnDefinition="mediumtext") private String description;
    @Column(name="start_at", nullable=false) private LocalDateTime startAt;
    @Column(name="end_at") private LocalDateTime endAt;
    @Column(name="location_name") private String locationName;
    private String address;
    private BigDecimal latitude; private BigDecimal longitude;
    @Column(name="register_url", length=500) private String registerUrl;
    @Column(name="is_featured", nullable=false) private boolean featured = false;

    @Enumerated(EnumType.STRING) @Column(nullable=false, length=16)
    private EventStatus status = EventStatus.draft;

    @ManyToMany
    @JoinTable(name="event_category",
            joinColumns=@JoinColumn(name="event_id"),
            inverseJoinColumns=@JoinColumn(name="category_id"))
    private Set<Category> categories = new HashSet<>();

    @OneToMany(mappedBy="event", cascade=CascadeType.ALL, orphanRemoval=true)
    private List<MediaAsset> media = new ArrayList<>();

    @Column(name="created_at", updatable=false, nullable=false) private LocalDateTime createdAt;
    @Column(name="updated_at", nullable=false) private LocalDateTime updatedAt;

    public enum EventStatus { draft, published, archived }
}
