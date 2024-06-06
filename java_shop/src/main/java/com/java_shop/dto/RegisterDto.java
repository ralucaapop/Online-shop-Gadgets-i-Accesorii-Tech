package com.java_shop.dto;

import lombok.Data;

@Data
public class RegisterDto {
    private String username;
    private String userPhone;
    private String userAddr;
    private String email;
    private String password;
    private String reTypePassword;
}
