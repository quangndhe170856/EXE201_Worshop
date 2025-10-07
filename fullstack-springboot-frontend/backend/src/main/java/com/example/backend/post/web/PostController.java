package com.example.backend.post.web;

import com.example.backend.post.domain.PostEntity;
import com.example.backend.post.repo.PostRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class PostController {

    private final PostRepository postRepo;

    @GetMapping
    public Page<PostResponse> list(@RequestParam(required = false) String q,
                                   @RequestParam(defaultValue = "0") int page,
                                   @RequestParam(defaultValue = "10") int size) {
        var posts = postRepo.search(q, PageRequest.of(page, size));
        return posts.map(PostResponse::from);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PostResponse create(@Valid @RequestBody CreatePostRequest req) {
        PostEntity p = new PostEntity();
        p.setTitle(req.title());
        p.setSlug(req.slug());
        p.setContent(req.content());
        p.setPublishedAt(LocalDateTime.now());
        p.setStatus(PostEntity.PostStatus.published);
        return PostResponse.from(postRepo.save(p));
    }
}
