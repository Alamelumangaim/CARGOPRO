import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { MenuComponent } from '../menu/menu.component';
import { MainService } from '../../services/main.service';
import { response } from 'express';
@Component({
  selector: 'app-delivery-dashboard',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './delivery-dashboard.component.html',
  styleUrl: './delivery-dashboard.component.css'
})
export class DeliveryDashboardComponent implements OnInit{
  count: any;
  damagedCount: any;
  pendingCount: any;
  deliveredCount: any;
  constructor(private service: MainService){}
  public bookings: number=20;
  public centers:number=10;
  ngOnInit(): void {
    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
        datasets: [{
          label: '# of Deliveries',
          data: [2, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    new Chart("myChart1",{
      type:'doughnut',
      data:{
        labels:['Chennai','Bangalore','Mumbai','Delhi'],
        datasets:[{
          label:"Bookings by cities",
          data:[300,20,100],
          backgroundColor:[
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset:4,
          
        }]
      }
    })
    this.service.getCountPerishable(sessionStorage.getItem('username'),sessionStorage.getItem('password')).subscribe(
      (response)=>{
        this.count=response;
        console.log(this.count);
      }
    )
    this.service.getCountDamaged(sessionStorage.getItem('username'),sessionStorage.getItem('password')).subscribe(
      (response)=>{
        this.damagedCount=response;
      }
    )
    this.service.getCountPending(sessionStorage.getItem('username'),sessionStorage.getItem('password')).subscribe(
      (response)=>{
        this.pendingCount=response;
      }
    )
    this.service.getCountDelivered(sessionStorage.getItem('username'),sessionStorage.getItem('password')).subscribe(
      (response)=>{
        this.deliveredCount=response;
      }
    )
  }

  

}
  

