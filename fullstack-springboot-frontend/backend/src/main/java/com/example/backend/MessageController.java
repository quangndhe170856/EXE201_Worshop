package com.example.backend;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import jakarta.validation.constraints.*;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:5173") // adjust if your frontend port differs
public class MessageController {
    private final Map<Long, Message> db = new LinkedHashMap<>();
    private long seq = 1L;

    @GetMapping
    public List<Message> list() {
        return new ArrayList<>(db.values());
    }

    @PostMapping
    public Message create(@RequestBody CreateMessage body) {
        long id = seq++;
        Message m = new Message(id, body.content());
        db.put(id, m);
        return m;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        db.remove(id);
    }

    public record CreateMessage(@NotBlank String content) { }
}
