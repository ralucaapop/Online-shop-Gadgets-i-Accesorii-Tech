package com.java_shop.service.impl;


import com.java_shop.model.OrderData;
import com.java_shop.repository.CustomerRepository;
import com.java_shop.repository.OrderDataRepository;
import com.java_shop.service.OrderDataService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class OrderDataServiceImpl implements OrderDataService {
    private final OrderDataRepository orderDataRepository;
    private final CustomerRepository customerRepository;

    public OrderDataServiceImpl(OrderDataRepository orderDataRepository, CustomerRepository customerRepository) {
        this.orderDataRepository = orderDataRepository;
        this.customerRepository = customerRepository;
    }

    @Override
    public Optional<OrderData> getOrderById(Long id) {
        return orderDataRepository.findById(id);
    }

    @Override
    public List<OrderData> getAllOrders() {
        return orderDataRepository.findAll();
    }

    @Override
    public OrderData saveOrder(OrderData orderData) {
        return orderDataRepository.save(orderData);
    }

    @Override
    public OrderData updateOrder(OrderData orderData) {
        return orderDataRepository.save(orderData);
    }

    @Override
    public void deleteOrderById(Long id) {
     orderDataRepository.deleteById(id);
    }

    @Override
    public List<OrderData> getOrdersByDate(LocalDate date) {
        return orderDataRepository.getReservationByDate(date);
    }
}
