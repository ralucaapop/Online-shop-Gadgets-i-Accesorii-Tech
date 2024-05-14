package com.java_shop.repository;


import com.java_shop.model.OrderData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderDataRepository extends JpaRepository<OrderData,Long> {
    List<OrderData> getReservationByDate(LocalDate date);
}
