import { Component } from '@angular/core';
import { RouterOutlet,RouterModule,RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-inventory-menu',
  standalone: true,
  imports: [RouterOutlet,RouterModule,RouterLink,RouterLinkActive],
  templateUrl: './inventory-menu.component.html',
  styleUrl: './inventory-menu.component.css'
})
export class InventoryMenuComponent {

}
