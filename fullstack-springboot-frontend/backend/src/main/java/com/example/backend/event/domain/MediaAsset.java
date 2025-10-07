package com.example.backend.event.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name="media_asset")
@Getter @Setter @NoArgsConstructor
public class MediaAsset {
    @Id @Column(columnDefinition="char(36)") private String id;
    @PrePersist void prePersist(){ if(id==null) id=java.util.UUID.randomUUID().toString(); createdAt=LocalDateTime.now(); }

    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="event_id", nullable=false)
    private EventEntity event;

    @Column(nullable=false, length=1000) private String url;
    @Enumerated(EnumType.STRING) @Column(nullable=false, length=16) private MediaType type;
    @Column(nullable=false) private int position = 0;
    @Column(name="created_at", nullable=false) private LocalDateTime createdAt;

    public enum MediaType { image, video }
}
