package com.java_shop.service.impl;

import com.java_shop.model.*;
import com.java_shop.service.AdminService;
import com.java_shop.service.CustomerService;
import com.java_shop.service.OrderDataService;
import com.java_shop.service.ProductService;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import java.time.LocalDate;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService{
    private CustomerService customerService;
    private ProductService productService;
    private OrderDataService orderDataService;

    public AdminServiceImpl(CustomerService customerService, ProductService productService, OrderDataService orderDataService) {
        this.customerService = customerService;
        this.productService = productService;
        this.orderDataService = orderDataService;
    }

    @Override
    public void setup() {
        //customer
        if(customerService.getCustomersByName("Popescu Mihai").isEmpty()) {
            Customer customer = new Customer();
            customer.setName("Popescu Mihai");
            customer.setEmail("popescu.mihai@gmail.com");
            customer.setPassword("abcd1234");
            customer.setAddress("Strada Teilor, nr.5, Timisoara");
            customer.setPhone("0725456765");
            customer.setUserRole(UserRole.CUSTOMER);
            customer = this.customerService.saveCustomer(customer);
        }

        if(this.customerService.getCustomersByName("admin").isEmpty()) {
            Customer admin = new Customer();
            admin.setName("admin");
            admin.setEmail("admin@admin.com");
            admin.setPassword("admin");
            admin.setAddress("Strada Cireselor, nr 14, Timisoara");
            admin.setPhone("12345678");
            admin.setUserRole(UserRole.ADMIN);
            this.customerService.saveCustomer(admin);
        }
        //products
        Product p1 = new Product();
        p1.setName("Laptop Gaming");
        p1.setDescription("Un laptop");
        p1.setPrice(2500);
        p1.setProductType(ProductType.MEDIUM);
        p1.setImage2("");
        p1.setImage1("");
        p1.setImage3("");
        p1.setImage4("");

        p1 = this.productService.saveProduct(p1);

        //order
        OrderData order1 = new OrderData();
        order1.setCustomer(this.customerService.getCustomersByName("Popescu Mihai").get(0));
        order1.setProductList(List.of(p1));
        order1.setTotal(p1.getPrice());
        order1.setDetails("Livrare pana la 12:00");
        order1.setPaymentStatus(PaymentStatus.PENDING);
        order1.setDate(LocalDate.parse("2024-05-08"));

        this.orderDataService.saveOrder(order1);
    }
}
