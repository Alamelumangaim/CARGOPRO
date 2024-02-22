import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { InventoryMenuComponent } from '../inventory-menu/inventory-menu.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InventoryMenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  public bookings: number=20;
  public centers:number=10;
  ngOnInit(): void {
    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
        datasets: [{
          label: '# of Bookings',
          data: [12, 19, 3, 5, 2, 3],
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
  }
  

}
  

