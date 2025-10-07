package com.example.backend.event.service;

import com.example.backend.event.domain.EventEntity;
import com.example.backend.event.repo.EventRepository;
import com.example.backend.event.web.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository repo;

    // 🟢 CREATE
    @Transactional
    public EventResponse create(CreateEventRequest req) {
        var entity = new EventEntity();
        entity.setTitle(req.title());
        entity.setSlug(req.slug());
        entity.setDescription(req.description());
        entity.setStartAt(req.startAt());
        entity.setEndAt(req.endAt());
        entity.setLocationName(req.locationName());
        entity.setAddress(req.address());
        entity.setRegisterUrl(req.registerUrl());
        entity.setFeatured(req.featured());
        repo.save(entity);
        return EventResponse.from(entity);
    }

    // 🟢 READ (filter + pagination)
    @Transactional(readOnly = true)
    public Page<EventResponse> search(String q, Integer categoryId, LocalDateTime from, LocalDateTime to, Pageable pageable) {
        return repo.search(q, categoryId, from, to, pageable)
                .map(EventResponse::from);
    }

    // 🟢 READ detail
    @Transactional(readOnly = true)
    public EventResponse getById(String id) {
        var e = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found"));
        return EventResponse.from(e);
    }

    // 🟡 UPDATE featured
    @Transactional
    public EventResponse updateFeatured(String id, UpdateEventRequest req) {
        var e = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found"));
        e.setFeatured(req.featured());
        return EventResponse.from(e);
    }

    // 🔴 DELETE
    @Transactional
    public void delete(String id) {
        if (!repo.existsById(id))
            throw new EntityNotFoundException("Event not found");
        repo.deleteById(id);
    }
}
