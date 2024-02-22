package com.example.productmanagement.Repository;

import com.example.productmanagement.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    @Query("select count(*) from Product p where p.perishable=true")
    Long countByPerishable();
    @Query(value = "select * from Product p where p.username is not null ",nativeQuery = true)
    List<Product> findByDelivery();
    @Query(value = "select * from Product p where p.username is null",nativeQuery = true)
    List<Product> findByInventory();


    @Query(value = "Select * from Product p where p.id= :id",nativeQuery = true)
    Product findByProductId(Long id);
    @Query(value = "select * from Product p where p.damage_status=true",nativeQuery = true)
    List<Product> damagedProducts();

    @Query(value = "select * from Product p where p.username= :username",nativeQuery = true)
    List<Product> findDeliveryByUsername(String username);
    @Query(value = "select * from Product p where p.username= :username",nativeQuery = true)
    Product findDeliveryReportByUsername(String username);
    @Query(value = "select count(*) from Product p where p.damage_status=true",nativeQuery = true)
    Long countByDamaged();
    @Query(value = "select count(*) from Product p where p.status='OutForDelivery'",nativeQuery = true)
    Long countByPending();
    @Query(value = "select count(*) from Product p where p.status='REACHED'",nativeQuery = true)
    Long countOfDelivered();
}
