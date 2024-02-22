import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { MatSort,Sort,MatSortModule } from '@angular/material/sort';
import { AfterViewInit,ViewChild } from '@angular/core';
import { Product } from '../../Product';
import { NgFor,NgIf } from '@angular/common';
import { UpdateProductComponent } from '../update-product/update-product.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MainService } from '../../services/main.service';
import { response } from 'express';
import { DataSource } from '@angular/cdk/collections';
import { InventoryMenuComponent } from '../inventory-menu/inventory-menu.component';
import { AssignDeliveryComponent } from '../assign-delivery/assign-delivery.component';
@Component({
  selector: 'app-inventory-product',
  standalone: true,
  imports: [InventoryMenuComponent,MatTableModule,MatButtonModule,MatPaginatorModule,MatSortModule,NgFor,NgIf,AssignDeliveryComponent],
  templateUrl: './inventory-product.component.html',
  styleUrl: './inventory-product.component.css'
})
export class InventoryProductComponent {
  public products: Product[] = []
  public isDeliveryRequired = false;
  
  datasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
ngAfterViewInit(): void {

}
constructor(private service: MainService,private dialog: MatDialog){}
ngOnInit(): void {
    this.service.getInventoryProducts(sessionStorage.getItem('username'),sessionStorage.getItem('password')).subscribe(
      (response)=>{
        console.log(response);
        this.products=response;
        this.datasource= new MatTableDataSource(this.products);
        this.datasource.paginator=this.paginator;
        this.datasource.sort = this.sort;
      }
    )
    
    
}
displayedColumns: string[] = ['Product ID', 'Category', 'Status','Expiry Date','Update','Assign'];
UpdateProduct(id: any){
 
  this.dialog.open(UpdateProductComponent,{
    enterAnimationDuration:'1000ms',
    exitAnimationDuration:'500ms',
    width:'50%',
    data:{
      productid: id
    }
  })
 
}
AssignDelivery(id: any){
 
  this.dialog.open(AssignDeliveryComponent,{
    enterAnimationDuration:'1000ms',
    exitAnimationDuration:'500ms',
    width:'50%',
    data:{
      productid: id
    }
  })
 
}
}
