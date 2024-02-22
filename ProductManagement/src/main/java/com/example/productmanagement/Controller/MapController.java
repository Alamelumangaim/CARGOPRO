package com.example.productmanagement.Controller;

import com.example.productmanagement.Response.Position;
import com.example.productmanagement.Service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/logistics")
public class MapController {
    @Autowired
    private final ProductService productService;
    @GetMapping("getPosition")
    public ResponseEntity<Position> getPosition(@RequestParam Long id){
        Position position = productService.getPosition(id);
        return new ResponseEntity<>( position, HttpStatus.OK );
    }
}
