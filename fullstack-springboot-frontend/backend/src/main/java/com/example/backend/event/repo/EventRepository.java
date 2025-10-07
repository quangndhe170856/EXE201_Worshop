package com.example.backend.event.repo;

import com.example.backend.event.domain.EventEntity;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.*;

@Repository
public interface EventRepository extends JpaRepository<EventEntity, String> {

    // ✅ Giữ nguyên query search của bạn
    @Query("""
        select distinct e from EventEntity e
        left join e.categories c
        where (:q is null or :q = '' or lower(e.title) like lower(concat('%', :q, '%'))
               or lower(e.description) like lower(concat('%', :q, '%')))
          and (:categoryId is null or c.id = :categoryId)
          and (:from is null or e.startAt >= :from)
          and (:to is null or (e.endAt is not null and e.endAt <= :to)
               or (e.endAt is null and e.startAt <= :to))
    """)
    Page<EventEntity> search(@Param("q") String q,
                             @Param("categoryId") Integer categoryId,
                             @Param("from") LocalDateTime from,
                             @Param("to") LocalDateTime to,
                             Pageable pageable);

    // ✅ 1️⃣ Lấy theo slug (cho trang chi tiết)
    Optional<EventEntity> findBySlug(String slug);

    // ✅ 2️⃣ Lấy các sự kiện nổi bật (featured = true)
    @Query("""
        select e from EventEntity e
        where e.featured = true
        order by e.startAt desc
    """)
    List<EventEntity> findFeatured();

    // ✅ 3️⃣ Lấy tất cả event trong khoảng thời gian cụ thể
    @Query("""
        select e from EventEntity e
        where e.startAt >= :from and e.startAt <= :to
        order by e.startAt asc
    """)
    List<EventEntity> findByDateRange(@Param("from") LocalDateTime from,
                                      @Param("to") LocalDateTime to);

    // ✅ 4️⃣ Toggle featured flag (sử dụng trong UpdateEventRequest)
    @Modifying
    @Query("update EventEntity e set e.featured = :featured where e.id = :id")
    void updateFeatured(@Param("id") String id, @Param("featured") boolean featured);
}
