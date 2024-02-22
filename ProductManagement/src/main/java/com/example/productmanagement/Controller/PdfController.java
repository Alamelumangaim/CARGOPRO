package com.example.productmanagement.Controller;

import com.example.productmanagement.Model.Product;
import com.example.productmanagement.Response.DeliveryResponse;
import com.example.productmanagement.Service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/logistics")
public class PdfController {
    private final ProductService productService;
    @GetMapping("deliveryReport")
        public ResponseEntity<DeliveryResponse> getDeliveryReport(@RequestParam String username){
            DeliveryResponse deliveryResponse = productService.getDeliveryReportbyUser( username );
            return new ResponseEntity<>( deliveryResponse, HttpStatus.OK );
        }

}
