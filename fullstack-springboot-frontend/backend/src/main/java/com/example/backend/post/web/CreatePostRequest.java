package com.example.backend.post.web;

import jakarta.validation.constraints.NotBlank;

public record CreatePostRequest(
        @NotBlank String title,
        @NotBlank String slug,
        String content
) {}
