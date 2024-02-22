import { Component, Inject } from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { MainService } from '../../services/main.service';
import { response } from 'express';
@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,ReactiveFormsModule,NgIf],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  private url = environment.apiBaseUrl;
  
  updateForm = this.fb.group({
    status:['',Validators.required]
  })
  constructor(private fb: FormBuilder,private dialogRef: DialogRef<UpdateProductComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private http: HttpClient,private service: MainService) {}
  SubmitForm(){
    let postData = {
      "id":this.data.productid,
      "status":this.updateForm.value.status
    }
    
    console.log(this.data.productid)
    console.log(postData);
    console.log(sessionStorage.getItem('username') );
    console.log( sessionStorage.getItem('password'));
    this.service.getStatus(this.data.productid,this.updateForm.value.status,sessionStorage.getItem('username'),sessionStorage.getItem('password')).subscribe(
      (response)=>{
        console.log(response);
      }
    )
   
  }
 
}
