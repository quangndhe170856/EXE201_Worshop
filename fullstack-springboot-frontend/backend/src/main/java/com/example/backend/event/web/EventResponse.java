package com.example.backend.event.web;

import com.example.backend.event.domain.EventEntity;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;

@Builder
public record EventResponse(
        String id,
        String title,
        String slug,
        String description,
        LocalDateTime startAt,
        LocalDateTime endAt,
        String locationName,
        String address,
        boolean featured,
        String status,
        String registerUrl,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<CategoryItem> categories
) {
    public static EventResponse from(EventEntity e) {
        var cats = e.getCategories().stream()
                .map(c -> new CategoryItem(c.getId(), c.getName()))
                .toList();

        return EventResponse.builder()
                .id(e.getId())
                .title(e.getTitle())
                .slug(e.getSlug())
                .description(e.getDescription())
                .startAt(e.getStartAt())
                .endAt(e.getEndAt())
                .locationName(e.getLocationName())
                .address(e.getAddress())
                .featured(e.isFeatured())
                .status(e.getStatus().name())
                .registerUrl(e.getRegisterUrl())
                .createdAt(e.getCreatedAt())
                .updatedAt(e.getUpdatedAt())
                .categories(cats)
                .build();
    }

    public record CategoryItem(Integer id, String name) {}
}
