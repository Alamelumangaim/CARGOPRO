import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../employee.service';
import { response } from 'express';
import { Employee } from '../employee';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{
  employees: Employee[]=[]
  datasource: any
  constructor(private service: EmployeeService){}
  
  ngOnInit(): void {
      this.service.getEmployee().subscribe(
        (response)=>{
          this.employees=response
          this.datasource=new MatTableDataSource(this.employees)
        }
      );
  }
  displayedColumns: string[] = ['employeeid', 'name','address','age','salary','experience','dept','dob'];
}
