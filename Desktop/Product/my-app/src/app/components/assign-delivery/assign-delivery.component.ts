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
  selector: 'app-assign-delivery',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,ReactiveFormsModule,NgIf],
  templateUrl: './assign-delivery.component.html',
  styleUrl: './assign-delivery.component.css'
})
export class AssignDeliveryComponent {
  updateForm = this.fb.group({
    assign:['',Validators.required]
  })
  constructor(private fb: FormBuilder,private dialogRef: DialogRef<AssignDeliveryComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private http: HttpClient,private service: MainService) {}

  SubmitForm(){
    this.service.assignDelivery(sessionStorage.getItem('username'),sessionStorage.getItem('password'),this.updateForm.value.assign,this.data.productid).subscribe(
      (response)=>{
        console.log(response);
      }
    )
  }
}
