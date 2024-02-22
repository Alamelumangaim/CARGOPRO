import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { securityGuard } from './guards/security.guard';
import { InventoryComponent } from './components/inventory/inventory.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { InventoryProductComponent } from './components/inventory-product/inventory-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportComponent } from './components/report/report.component';
import { DeliveryDashboardComponent } from './components/delivery-dashboard/delivery-dashboard.component';
export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"register",
        component:RegisterComponent
    },
    {
        path:"inventory",
        component:InventoryComponent,canActivate:[securityGuard]
    },
    {
        path:"delivery",
        component:DeliveryComponent,canActivate:[securityGuard]
    },
    {
        path:"product",
        component:ProductDetailsComponent,canActivate:[securityGuard]
    },
    {
        path:'inventoryProducts',
        component:InventoryProductComponent,canActivate:[securityGuard]
    },
    {
        path:'dashboard',
        component:DashboardComponent,canActivate:[securityGuard]
    },
    {
        path:'report',
        component:ReportComponent
    },
    {
        path:'deliveryDashboard',
        component:DeliveryDashboardComponent,canActivate:[securityGuard]
    }
];
