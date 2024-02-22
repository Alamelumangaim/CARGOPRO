import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [RouterOutlet,MenuComponent],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent implements OnInit{
  constructor(private router: Router){}
ngOnInit(): void {
    console.log(this.router.url)
}
}
