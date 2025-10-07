package com.example.backend.event.web;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public record CreateEventRequest(
        @NotBlank String title,
        @NotBlank String slug,
        String description,
        @NotNull LocalDateTime startAt,
        LocalDateTime endAt,
        String locationName,
        String address,
        String registerUrl,
        boolean featured
) {}
