import { Component, OnInit } from '@angular/core';
import { RouterModule,RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { MatSort,Sort,MatSortModule } from '@angular/material/sort';
import { AfterViewInit,ViewChild } from '@angular/core';
import { Product } from '../../Product';
import { NgFor } from '@angular/common';
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
import { TrackComponent } from '../track/track.component';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MenuComponent,MatTableModule,MatButtonModule,MatPaginatorModule,MatSortModule,NgFor,UpdateProductComponent,RouterModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  public products: Product[] = []
  datasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
ngAfterViewInit(): void {

}
constructor(private service: MainService,private dialog: MatDialog){}
ngOnInit(): void {
    this.service.getProducts(sessionStorage.getItem('username'),sessionStorage.getItem('password')).subscribe(
      (response)=>{
        console.log(response);
        this.products=response;
        this.datasource= new MatTableDataSource(this.products);
        this.datasource.paginator=this.paginator;
        this.datasource.sort = this.sort;
      }
    )
    
}
displayedColumns: string[] = ['Product ID', 'Category', 'Status','Expiry Date','Update','Track'];
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
TrackProduct(id: any){
 
  this.dialog.open(TrackComponent,{
    enterAnimationDuration:'1000ms',
    exitAnimationDuration:'500ms',
    width:'50%',
    data:{
      productid: id
    }
  })
 
}
}
