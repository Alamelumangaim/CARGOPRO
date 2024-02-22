package com.example.productmanagement.Controller;

import com.example.productmanagement.DTO.LoginDTO;
import com.example.productmanagement.DTO.ProductDTO;
import com.example.productmanagement.DTO.UserDTO;
import com.example.productmanagement.Model.Product;
import com.example.productmanagement.Model.User;
import com.example.productmanagement.Response.LoginResponse;
import com.example.productmanagement.Response.RegisterResponse;
import com.example.productmanagement.Service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/logistics")
public class ProductController {
    private final ProductService productService;
    @GetMapping("string")
    public ResponseEntity<String> getString(){
        return new ResponseEntity<>( productService.getString(), HttpStatus.OK );
    }
    @PostMapping("register")
    public ResponseEntity<RegisterResponse> addUser(@RequestBody User user){
        return new ResponseEntity<>( productService.addUser(user),HttpStatus.OK );
    }
    @GetMapping("login")
    public ResponseEntity<LoginResponse> login(@RequestParam String username, @RequestParam String password){

        return new ResponseEntity<>( productService.login(username,password),HttpStatus.OK );
    }

    @PostMapping("addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody ProductDTO product){
        Product product1 = productService.addProduct(product);
        return new ResponseEntity<>( product1,HttpStatus.CREATED );
    }

    @GetMapping("getProducts")
    public ResponseEntity<List<Product>> getProducts(){
        List<Product> products = productService.getProducts();
        return new ResponseEntity<>( products,HttpStatus.OK );
    }
    @DeleteMapping("deleteProduct/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") Long id){
        productService.deleteProduct(id);
        return new ResponseEntity<>( HttpStatus.OK );
    }
    @GetMapping("count")
    public ResponseEntity<Long> countProducts(){
        Long count = productService.countOfProducts();
        return new ResponseEntity<>( count,HttpStatus.OK );
    }
    @GetMapping("perishableProducts")
    public ResponseEntity<Long> PerishableProducts(){
        Long countPerishable = productService.countPerishableProducts();
        return new ResponseEntity<>( countPerishable,HttpStatus.OK );
    }
    @GetMapping("deliveryProducts")
    public ResponseEntity<List<Product>> deliveryProducts(){
        List<Product> products = productService.deliveryProducts();
        return new ResponseEntity<>( products,HttpStatus.OK );
    }
    @GetMapping("inventoryProducts")
    public ResponseEntity<List<Product>> inventoryProducts(){
        List<Product> products = productService.inventoryProducts();
        return new ResponseEntity<>( products,HttpStatus.OK );
    }
    @GetMapping("statusUpdate")
    public ResponseEntity<String> statusUpdate(@RequestParam Long id,@RequestParam String status ){

        String status1 = productService.updateStatus(id,status);
        return new ResponseEntity<>( status1,HttpStatus.OK );
    }
    @GetMapping("damagedProducts")
    public ResponseEntity<List<Product>> getDamagedProducts(){
        List<Product> products = productService.getDamagedProducts();
        return new ResponseEntity<>( products,HttpStatus.OK );
    }
    @GetMapping("countDamaged")
    public ResponseEntity<Long> getCountDamaged(){
        Long count = productService.countOfDamaged();
        return new ResponseEntity<>( count,HttpStatus.OK );
    }
    @GetMapping("countPending")
    public ResponseEntity<Long> getCountOfPending(){
        Long count = productService.countOfPending();
        return new ResponseEntity<>( count,HttpStatus.OK );
    }
    @GetMapping("countDelivered")
    public ResponseEntity<Long> getCountOfDelivered(){
        Long count = productService.countOfDelivered();
        return new ResponseEntity<>( count,HttpStatus.OK );
    }


}
