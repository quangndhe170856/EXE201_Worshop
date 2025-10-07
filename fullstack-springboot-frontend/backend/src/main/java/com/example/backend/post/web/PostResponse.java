package com.example.backend.post.web;

import com.example.backend.post.domain.PostEntity;
import java.time.LocalDateTime;

public record PostResponse(
        String id,
        String title,
        String slug,
        String content,
        LocalDateTime publishedAt,
        boolean featured,
        String status
) {
    public static PostResponse from(PostEntity p) {
        return new PostResponse(
                p.getId(), p.getTitle(), p.getSlug(), p.getContent(),
                p.getPublishedAt(), p.isFeatured(), p.getStatus().name()
        );
    }
}
