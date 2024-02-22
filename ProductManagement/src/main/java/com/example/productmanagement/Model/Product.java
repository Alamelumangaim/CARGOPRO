package com.example.productmanagement.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int productId;
    private String productCategory;
    private String status;
    private boolean damageStatus;
    private boolean perishable;
    private LocalDate expiryDate;
    private String username;
    private double lat;
    private double lon;
}
