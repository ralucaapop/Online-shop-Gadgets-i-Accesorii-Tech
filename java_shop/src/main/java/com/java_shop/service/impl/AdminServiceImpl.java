package com.java_shop.service.impl;

import com.java_shop.model.*;
import com.java_shop.service.AdminService;
import com.java_shop.service.CustomerService;
import com.java_shop.service.ProductService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    private CustomerService customerService;
    private ProductService productService;
    private OrderDataServiceImpl orderDataService;

    public AdminServiceImpl(CustomerService customerService, ProductService productService, OrderDataServiceImpl orderDataService) {
        this.customerService = customerService;
        this.productService = productService;
        this.orderDataService = orderDataService;
    }

    @Override
    public void setup() {
        //customer
        if(this.customerService.getCustomersByName("Popescu Mihai").isEmpty()) {
            Customer customer = new Customer();
            customer.setName("Popescu Mihai");
            customer.setEmail("popescu.mihai@gmail.com");
            customer.setAddress("Str. Teilor, nr. 5 Timisoara");
            customer.setPhone("1234567891");
            customer.setUserRole(UserRole.CUSTOMER);
            customer.setPassword("1234");
            customer = this.customerService.saveCustomer(customer);
        }
        if(this.customerService.getCustomersByName("admin").isEmpty()) {
            Customer admin = new Customer();
            admin.setName("admin");
            admin.setEmail("admin@admin.com");
            admin.setAddress("Str.Trandafirilor, nr.5 Timisoara");
            admin.setPhone("3333333333");
            admin.setPassword("admin");
            admin.setUserRole(UserRole.ADMIN);
            this.customerService.saveCustomer(admin);
        }
        //products
        Product product1  = new Product();
        product1.setName("Laptop");
        product1.setDescription("Un laptop");
        product1.setPrice(10000);
        product1.setProductType(ProductType.Laptop);
        product1.setImage1("");
        product1.setImage2("");
        product1.setImage3("");
        product1.setImage4("");
        product1 = this.productService.saveProduct(product1);

        //order
        OrderData order1 = new OrderData();
        order1.setCustomer(this.customerService.getCustomersByName("Popescu Mihai").get(0));
        order1.setProductList(List.of(product1));
        order1.setTotal(product1.getPrice());
        order1.setDetails("Livrare doar sambata");
        order1.setPaymentStatus(PaymentStatus.PENDING);
        order1.setDate(LocalDate.parse("2024-05-08"));
        this.orderDataService.saveOrder(order1);
    }
}
