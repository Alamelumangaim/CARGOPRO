package com.example.productmanagement.Controller;

import com.example.productmanagement.DTO.ProductDTO;
import com.example.productmanagement.Model.Product;
import com.example.productmanagement.Service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/logistics")
public class DeliveryController {
    @Autowired
    private final ProductService productService;
    @GetMapping("deliveryByUsername/{username}")
    public ResponseEntity<List<Product>> getDeliveryByUser( @PathVariable("username") String username){
        List<Product> products = productService.getDeliverybyUser(username);
        return new ResponseEntity<>( products, HttpStatus.OK );
    }
    @GetMapping("assignDelivery")
    public String assignDelivery(@RequestParam Long id,@RequestParam String username){
        return productService.assignDelivery(id,username);
    }
}
