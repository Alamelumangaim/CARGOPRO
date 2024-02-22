package com.example.productmanagement.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    RegisteredUserDetailsService registeredUserDetailsService;
    @Bean
    public UserDetailsService userDetailsManager(){
        return registeredUserDetailsService;
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
       http.authorizeHttpRequests(configurer->
               configurer
                       .requestMatchers( HttpMethod.GET,"/api/v1/logistics/string" ).hasRole( "INVENTORY" )
                       .requestMatchers( HttpMethod.POST,"/api/v1/logistics/register" ).permitAll()
                       .requestMatchers( HttpMethod.POST,"/api/v1/logistics/addProduct" ).hasRole( "INVENTORY" )
                       .requestMatchers( HttpMethod.GET,"/api/v1/logistics/getProducts" ).hasRole( "INVENTORY" )
                       .requestMatchers( HttpMethod.DELETE,"/api/v1/logistics/deleteProduct/**" ).hasRole( "INVENTORY" )
                       .requestMatchers( HttpMethod.GET,"/api/v1/logistics/deliveryProducts" ).hasRole( "DELIVERY" )
                       .requestMatchers( HttpMethod.GET,"/api/v1/logistics/inventoryProducts" ).hasRole( "INVENTORY" )
                       .requestMatchers( HttpMethod.GET,"/api/v1/logistics/statusUpdate/**" ).hasAnyRole( "INVENTORY","DELIVERY" )
                       .requestMatchers( HttpMethod.GET,"/api/v1/logistics/login" ).hasAnyRole( "INVENTORY","DELIVERY" )
                       .requestMatchers( HttpMethod.GET,"/api/v1/logistics/damagedProducts" ).hasAnyRole( "INVENTORY","DELIVERY" )
                       .requestMatchers( HttpMethod.GET,"/api/v1/logistics/deliveryByUsername/**" ).hasAnyRole( "INVENTORY","DELIVERY" )
                       .requestMatchers( HttpMethod.GET,"/api/v1/logistics/assignDelivery" ).hasAnyRole( "INVENTORY","DELIVERY" )
                       .requestMatchers( HttpMethod.GET,"/api/v1/logistics/getPosition" ).hasAnyRole( "INVENTORY","DELIVERY" )
                        .requestMatchers( HttpMethod.GET,"/api/v1/logistics/deliveryReport" ).hasAnyRole( "INVENTORY","DELIVERY" )
                       .requestMatchers( HttpMethod.GET,"/api/v1/logistics/perishableProducts" ).hasAnyRole( "DELIVERY","INVENTORY" )
                       .requestMatchers( HttpMethod.GET,"/api/v1/logistics/countDamaged" ).hasAnyRole( "DELIVERY","INVENTORY" )
                       .requestMatchers( HttpMethod.GET,"/api/v1/logistics/countPending" ).hasAnyRole( "DELIVERY","INVENTORY" )
                       .requestMatchers( HttpMethod.GET,"/api/v1/logistics/countDelivered" ).hasAnyRole( "DELIVERY","INVENTORY" )
               );
       http.httpBasic( Customizer.withDefaults());
       http.csrf(csrf->csrf.disable());
       http.userDetailsService( registeredUserDetailsService );
       return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    //    @Bean
//    public InMemoryUserDetailsManager userDetailsManager(){
//        UserDetails john = User.builder()
//                .username( "john" )
//                .password( "{noop}123" )
//                .roles( "DELIVERY" )
//                .build();
//        UserDetails mary = User.builder()
//                .username( "mary" )
//                .password( "{noop}123" )
//                .roles( "INVENTORY" )
//                .build();
//        return new InMemoryUserDetailsManager(john,mary);
//    }
}
