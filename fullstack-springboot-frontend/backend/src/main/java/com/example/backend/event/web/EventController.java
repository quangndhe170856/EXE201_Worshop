package com.example.backend.event.web;

import com.example.backend.event.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3005")
@RequiredArgsConstructor
public class EventController {

    private final EventService service;

    @PostMapping
    public EventResponse create(@Valid @RequestBody CreateEventRequest req) {
        return service.create(req);
    }

    @GetMapping
    public Page<EventResponse> search(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) LocalDateTime from,
            @RequestParam(required = false) LocalDateTime to,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("startAt").descending());
        return service.search(q, categoryId, from, to, pageable);
    }

    @GetMapping("/{id}")
    public EventResponse getById(@PathVariable String id) {
        return service.getById(id);
    }

    @PatchMapping("/{id}/featured")
    public EventResponse updateFeatured(@PathVariable String id, @RequestBody UpdateEventRequest req) {
        return service.updateFeatured(id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
