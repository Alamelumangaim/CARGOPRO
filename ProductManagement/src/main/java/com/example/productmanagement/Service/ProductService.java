package com.example.productmanagement.Service;

import com.example.productmanagement.DTO.LoginDTO;
import com.example.productmanagement.DTO.ProductDTO;
import com.example.productmanagement.DTO.UserDTO;
import com.example.productmanagement.Model.Product;
import com.example.productmanagement.Model.User;
import com.example.productmanagement.Repository.ProductRepository;
import com.example.productmanagement.Repository.UserRepository;

import com.example.productmanagement.Response.DeliveryResponse;
import com.example.productmanagement.Response.LoginResponse;
import com.example.productmanagement.Response.Position;
import com.example.productmanagement.Response.RegisterResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.Document;
import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductService {
    private final UserRepository registerRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    public Product addProduct(ProductDTO product) {
        Product product1 = new Product(
                product.getId(),
                product.getProductId(),
                product.getProductCategory(),
                product.getStatus(),
                product.isDamageStatus(),
                product.isPerishable(),
                product.getExpiryDate(),
                product.getUsername(),
                product.getLat(),
                product.getLon()
        );
        return productRepository.save( product1 );
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById( id );
    }

    public Long countOfProducts() {
        return productRepository.count();
    }


    public Long countPerishableProducts() {
        return productRepository.countByPerishable();
    }

    public List<Product> deliveryProducts() {
        return productRepository.findByDelivery();
    }

    public List<Product> inventoryProducts() {
        return productRepository.findByInventory();
    }

    public String getString() {
        return "Successfull";
    }


    public RegisterResponse addUser(User user) {
        User register = registerRepository.findByUsername( user.getUsername() );
        if(register!=null){
            return new RegisterResponse("USER_ALREADY_EXISTS");
        }
        user.setPassword( passwordEncoder.encode( user.getPassword() ) );
        User user1 = new User(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getRoles()
        );
        registerRepository.save( user1 );
        return new RegisterResponse("REGISTERED");
    }

    public String updateStatus(Long id,String status) {
        Product product = productRepository.findByProductId( id );
        if(product!=null){
            System.out.println(product.getId());
            product.setStatus( status );
            System.out.println(product.getStatus());
            productRepository.save( product );
            return "STATUS UPDATED";
        }
        return "FAILED";

    }

//    public String login(LoginDTO loginDTO) {
//       User user = registerRepository.findByUsername( loginDTO.getUsername() );
//       boolean isPasswordRight = passwordEncoder.matches( user.getPassword(), loginDTO.getPassword());
//       if(isPasswordRight){
//           return "SUCCESSFUL";
//       }
//       return "FAILED";
//    }

    public List<Product> getDamagedProducts() {
        return productRepository.damagedProducts();
    }

    public LoginResponse login(String username, String password) {
        String loginPassword = password;
        User user = registerRepository.findByUsername( username );
        if(user!=null){
            boolean isPasswordRight = passwordEncoder.matches( password ,user.getPassword() );
            System.out.println(isPasswordRight);
            if(isPasswordRight){
                return new LoginResponse("SUCCESSFUL",username,user.getRoles(),loginPassword);
            }
            return new LoginResponse("PASSWORD_NOT_MATCHED","","","");
        }
        return new LoginResponse("USER_NOT_FOUND","","","");

    }


    public List<Product> getDeliverybyUser(String username) {
        return productRepository.findDeliveryByUsername( username );
    }

    public String assignDelivery(Long id, String username) {
        Product product = productRepository.findByProductId( id );
        if(product!=null){
            product.setUsername( username );
            System.out.println(product.getId());
            System.out.println(product.getUsername());
            productRepository.save( product );
            return "ASSIGNED";
        }
        return "FAILED";
    }

    public Position getPosition(Long id) {
        Product product = productRepository.findByProductId( id );

        if(product!=null){
            double lat = product.getLat();
            double lon = product.getLon();
            System.out.println(lat);
            System.out.println(lon);
            return new Position(lat,lon);

        }
        return new Position(0,0);
    }

    public DeliveryResponse getDeliveryReportbyUser(String username) {
        Product product = productRepository.findDeliveryReportByUsername( username );
        return new DeliveryResponse( product.getUsername(), product.getProductCategory(), (long) product.getProductId(),product.getStatus() );
    }

    public Long countOfDamaged() {
        return productRepository.countByDamaged();
    }

    public Long countOfPending() {
        return productRepository.countByPending();
    }

    public Long countOfDelivered() {
        return productRepository.countOfDelivered();
    }
}
