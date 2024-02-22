package com.example.productmanagement.DTO;

import com.example.productmanagement.Model.Delivery;
import com.example.productmanagement.Model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ProductDTO {
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
