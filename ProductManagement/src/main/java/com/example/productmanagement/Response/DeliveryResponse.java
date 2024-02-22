package com.example.productmanagement.Response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class DeliveryResponse {
    String username;
    String category;
    Long productId;
    String status;

}
