import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, PatternValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import {ThemePalette} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { InputTextModule } from 'primeng/inputtext';
import { Employee } from '../employee';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet,ReactiveFormsModule,MatCheckboxModule,MatDatepickerModule,MatFormFieldModule,MatInputModule,
    MatNativeDateModule,MatRadioModule,MatSlideToggleModule,InputTextModule,RouterLink,RouterLinkActive,ToastModule],
    providers:[MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  employees: Employee[]=[]
  employeeForm=this.fb.group(
    {
      employeeid:['',[Validators.required,Validators.max(10000)]],
      name:['',[Validators.required,Validators.maxLength(25),Validators.pattern('[A-Z]*')]],
      dept:['',[Validators.required]],
      age:['',Validators.required],
      address:['',Validators.required],
      dob:['',Validators.required],
      salary:['',Validators.required],
      experience:['',Validators.required]
    }
  )
  constructor(private fb: FormBuilder,private http: HttpClient,private messageService: MessageService){}
  SubmitForm(){
    let postData={
      "employeeid":this.employeeForm.value.employeeid,
      "name":this.employeeForm.value.name,
      "dept":this.employeeForm.value.dept,
      "age":this.employeeForm.value.age,
      "address":this.employeeForm.value.address,
      "dob":this.convert(this.employeeForm.value.dob),
      "salary":this.employeeForm.value.salary,
      "experience":this.employeeForm.value.experience
    }
    console.log(this.employeeForm.value)
    this.http.post("http://localhost:8080/api/employee/add",postData).subscribe(
      (response)=>console.log(response)
    );
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Submitted Successfully' })
  }
  convert(str: any){
   
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
 return [date.getFullYear(), mnth, day].join("-");
  }
}
