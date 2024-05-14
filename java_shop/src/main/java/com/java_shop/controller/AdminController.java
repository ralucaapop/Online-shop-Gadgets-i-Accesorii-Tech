package com.java_shop.controller;

import com.java_shop.service.AdminService;
import com.java_shop.utils.ApiResponse;
import org.aspectj.lang.annotation.Around;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> setup(){
        this.adminService.setup();
        return ResponseEntity.ok(ApiResponse.success("setup with succes", null));
    }
}
