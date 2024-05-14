package com.java_shop.service.impl;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import com.java_shop.dto.LoginDto;
import com.java_shop.dto.RegisterDto;
import com.java_shop.exception.BadRequestException;
import com.java_shop.exception.ResourceNotFoundException;
import com.java_shop.model.Customer;
import com.java_shop.model.UserRole;
import com.java_shop.repository.CustomerRepository;
import com.java_shop.service.AuthService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    private final CustomerRepository customerRepository;

    public AuthServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public Customer login(LoginDto loginDto) {
        if (loginDto.getEmail() == null || loginDto.getEmail().isBlank()) {
            throw new BadRequestException("The email is not valid");
        }
        if (loginDto.getPassword() == null || loginDto.getPassword().isBlank()) {
            throw new BadRequestException("The password is not valid");
        }
        Optional<Customer> customerOptional = customerRepository.getCustomerByEmail(loginDto.getEmail());
        customerOptional.orElseThrow(() ->
                new ResourceNotFoundException("The email is not registered"));

        boolean isMatch = BCrypt.checkpw(loginDto.getPassword(), customerOptional.get().getPassword());
        if (!isMatch) {
            throw new BadRequestException("Credentials not match");
        }

        return customerOptional.get();
    }

    @Override
    public Customer register(RegisterDto registerDto) {
        if (registerDto.getUsername() == null || registerDto.getUsername().isBlank()) {
            throw new BadRequestException("The username is invalid");
        }
        if (registerDto.getEmail() == null || registerDto.getEmail().isBlank()) {
            throw new BadRequestException("The email is invalid");
        }
        else if(!registerDto.getEmail().equals("admin@admin.com") && registerDto.getEmail() != null && registerDto.getEmail().isBlank()== false)
        {
            String regex_for_email = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
            Pattern pattern = Pattern.compile(regex_for_email);
            Matcher matcher = pattern.matcher(registerDto.getEmail());
            if(!matcher.matches())
                throw new BadRequestException("The email is invalid");
        }
        if (registerDto.getPassword() == null || registerDto.getPassword().isBlank()) {
            throw new BadRequestException("The password is invalid");
        }
        if (!registerDto.getPassword().equals(registerDto.getReTypePassword())) {
            throw new BadRequestException("Passwords not match");
        }

        Optional<Customer> customerOptional = customerRepository.getCustomerByEmail(registerDto.getEmail());
        if (customerOptional.isPresent()) {
            throw new BadRequestException("Email already exist in db");
        }

        Customer customer = new Customer();
        customer.setName(registerDto.getUsername());
        customer.setEmail(registerDto.getEmail());

        String password = BCrypt.hashpw(registerDto.getPassword(), BCrypt.gensalt());
        customer.setPassword(password);
        customer.setUserRole(UserRole.CUSTOMER);

        return customerRepository.save(customer);
    }
}
