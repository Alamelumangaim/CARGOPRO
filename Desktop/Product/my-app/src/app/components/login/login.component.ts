import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { HeaderComponent } from '../header/header.component';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MainService } from '../../services/main.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,RouterLink,RouterLinkActive,MatSelectModule,MatInputModule,MatFormFieldModule,
    NgIf,ToastModule,HeaderComponent,HttpClientModule],
  providers:[HttpClient,MessageService,Router],  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public url = environment.apiBaseUrl;
  public loginForm = this.fb.group({
    username:["",Validators.required],
    password:["",Validators.required]
  })
  constructor(private fb: FormBuilder,private http: HttpClient,private messageService: MessageService,private router: Router,private service: MainService) {
    sessionStorage.clear();
  }
  SubmitForm(){
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value.username,this.loginForm.value.password).subscribe(
      (resultData: any)=>{
        if(resultData.message == "SUCCESSFUL"){
          console.log(resultData);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged In Successfully' });
          this.router.navigate(['']);
          sessionStorage.setItem('username',resultData.username);
          sessionStorage.setItem('role',resultData.role);
          sessionStorage.setItem('password',resultData.password)
          this.router.navigate(['']);
        }
        
        else if(resultData.message=="PASSWORD_NOT_MATCHED"){
          this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Password not matched' });
        }
        else if(resultData.message=="USER_NOT_FOUND"){
          this.messageService.add({severity:'error',summary:'Error',detail:'User not exists'})
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Log In Failed' });
        }
      }
    )
  
  }
}
