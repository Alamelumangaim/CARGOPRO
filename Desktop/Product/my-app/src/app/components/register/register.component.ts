import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { response } from 'express';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from '../header/header.component';
import { environment } from '../../../environments/environment.development';
import {MatRadioModule} from '@angular/material/radio';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatSelectModule,ReactiveFormsModule,RouterOutlet,RouterLink,RouterLinkActive,HttpClientModule,NgIf,
    ToastModule,HeaderComponent,MatRadioModule],
    providers:[MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private url = environment.apiBaseUrl;
  registerForm = this.fb.group(
    {
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      role:['',Validators.required]
    }
  )
  constructor(private http: HttpClient,private fb: FormBuilder,private messageService: MessageService){}
  SubmitForm(){
    console.log(this.registerForm.value);
    let postData={
      "username":this.registerForm.value.name,
      "email":this.registerForm.value.email,
      "password":this.registerForm.value.password,
      "roles":this.registerForm.value.role
    }
    this.http.post(`${this.url}/register`,postData).subscribe(
      (resultData: any)=>{
        console.log(resultData.message);
        if(resultData.message=="REGISTERED"){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered Successfully' });
        }
        else if(resultData.message=="USER_ALREADY_EXISTS"){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User email already exists' });
        }
        else{
          this.messageService.add({severity:'error',summary:'Error',detail:'Registration failed'});
        }
      }
    )
  }
}
