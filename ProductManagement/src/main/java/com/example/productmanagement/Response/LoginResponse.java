package com.example.productmanagement.Response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class LoginResponse {
    String message;
    String username;
    String role;
    String password;
}
