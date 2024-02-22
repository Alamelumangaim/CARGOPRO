import { Component, DoCheck } from '@angular/core';
import { RouterModule,RouterLink,RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MainService } from '../../services/main.service';
import { NgIf } from '@angular/common';
import { InventoryMenuComponent } from '../inventory-menu/inventory-menu.component';
@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [RouterModule,RouterLink,RouterLinkActive,HeaderComponent,NgIf,InventoryMenuComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements DoCheck{
isLoginRequired = true;
constructor(private service: MainService){}
ngDoCheck(): void {
    if(this.service.IsLoggedIn()){
      this.isLoginRequired=false;
    }
    else{
      this.isLoginRequired=true;
    }
}
}
