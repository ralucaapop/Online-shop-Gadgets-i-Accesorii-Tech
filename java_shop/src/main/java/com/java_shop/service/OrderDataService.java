package com.java_shop.service;

import com.java_shop.model.OrderData;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface OrderDataService {

    Optional<OrderData> getOrderById(Long id);
    List<OrderData> getAllOrders();
    OrderData saveOrder(OrderData orderData);
    OrderData updateOrder(OrderData orderData);
    void deleteOrderById(Long id);
    List<OrderData> getOrdersByDate(LocalDate date);
}
