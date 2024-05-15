package com.java_shop.dto;

import com.java_shop.model.Product;
import lombok.Data;

import java.util.List;

@Data
public class ProductsDto {
    private List<Product> products;
}
