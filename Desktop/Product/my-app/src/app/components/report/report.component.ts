import { Component, DoCheck, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MainService } from '../../services/main.service';
import { Product } from '../../Product';
import { NgFor,NgIf } from '@angular/common';
import { InventoryMenuComponent } from '../inventory-menu/inventory-menu.component';
import { MenuComponent } from '../menu/menu.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-report',
  standalone: true,
  imports: [NgFor,InventoryMenuComponent,MenuComponent,NgIf],
  providers:[MainService],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})

export class ReportComponent implements DoCheck{
  public products: Product[] = [];
  public isDelivery =false;
  constructor(private service: MainService){}
  ngDoCheck(): void {
      if(this.service.GetUserrole()=='delivery'){
        this.isDelivery = true;
      }
      else{
        this.isDelivery=false;
      }
  }
// ngOnInit(): void {
//     this.service.getProducts(sessionStorage.getItem('username'),sessionStorage.getItem('password')).subscribe(
//       (response)=>{
//         console.log(response);
//        this.products=response;
//       }
//     )
    
// }
  generatePDF() {
    this.service.getDeliveryReport(sessionStorage.getItem('username'),sessionStorage.getItem('password')).subscribe(
      (resultData: any)=>{
        console.log(resultData.productId)
       let docDefinition:any = {
        content: [
          {
            text: 'REPORT',
            fontSize: 16,
            alignment: 'center',
            color: '#000000'
          },
          {
            text: 'DELIVERY STATUS',
            fontSize: 20,
            bold: true,
            alignment: 'center',
            decoration: 'underline',
            color: '#000000'
          },
          {
            text: 'Customer Details',
            style: 'sectionHeader'
          },
          {
            columns: [
              [
                {
                  text: resultData.username,
                  bold:true
                },
                { text: "Vadapalani" },
                { text:"john@gmail.com" },
                { text: "909976457" }
              ],
              [
                {
                  text: `Date: ${new Date().toLocaleString()}`,
                  alignment: 'right'
                },
                { 
                  text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
                  alignment: 'right'
                }
              ]
            ]
          },
          {
            text: 'Order Details',
            style: 'sectionHeader'
          },
          {
            table: {
              headerRows: 1,
              widths: ['*', '*', '*', '*'],
              body: [
                ['ProductId', 'Category', 'Status','damage'],
                // ...resultData.map((p: { productId: any; Category: any; status: any; username: any; })=>([p.productId,p.Category,p.status,p.username]))
              ]
              
            }
          },
         
        ],
        styles: {
          sectionHeader: {
            bold: true,
            decoration: 'underline',
            fontSize: 14,
            margin: [0, 15,0, 15]          
          }
        }
      };
      pdfMake.createPdf(docDefinition).open();      
      },
      
    )


 
     
    

  }


}
