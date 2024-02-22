package com.example.productmanagement.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "product_id",referencedColumnName = "id")
//    Product product;
}