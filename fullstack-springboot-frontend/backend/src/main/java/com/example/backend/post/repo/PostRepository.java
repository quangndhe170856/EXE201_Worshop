package com.example.backend.post.repo;

import com.example.backend.post.domain.PostEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<PostEntity, String> {

    @Query("""
      select p from PostEntity p
      where (:q is null or lower(p.title) like lower(concat('%', :q, '%'))
             or lower(p.content) like lower(concat('%', :q, '%')))
    """)
    Page<PostEntity> search(@Param("q") String q, Pageable pageable);
}
