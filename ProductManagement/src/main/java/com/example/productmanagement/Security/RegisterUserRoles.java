package com.example.productmanagement.Security;

public class RegisterUserRoles {
    public static String getRoles(String role){
        String userRole = UserRoles.ADMIN;
        switch (role){
            case "inventory"->userRole=UserRoles.INVENTORY;
            case "delivery"->userRole=UserRoles.DELIVERY;
        }
        return userRole;
    }
}
