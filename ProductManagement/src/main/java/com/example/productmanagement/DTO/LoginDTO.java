package com.example.productmanagement.DTO;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class LoginDTO {
    private String username;
    private String password;
}
