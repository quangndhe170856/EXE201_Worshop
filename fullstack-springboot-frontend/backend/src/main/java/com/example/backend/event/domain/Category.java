package com.example.backend.event.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name="category")
@Getter @Setter @NoArgsConstructor
public class Category {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer id;
    @Column(nullable=false, unique=true, length=120) private String name;
}
