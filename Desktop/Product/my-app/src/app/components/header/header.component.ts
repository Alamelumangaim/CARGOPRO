import { Component, DoCheck } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive, Router } from '@angular/router';
import { MainService } from '../../services/main.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,NgIf],
  providers:[MainService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements DoCheck{
isInventoryRequired = false;
isDeliveryRequired = false;
isLoginRequired = true;
ismenuRequired = false;
isTrue = true;

constructor(private service: MainService,private router: Router){}
currenturl = this.router.url
but(){
  console.log(this.isDeliveryRequired);
  console.log(this.currenturl);
}
ngDoCheck(): void {
  if(this.currenturl=='/login' || this.currenturl=='/register'){
    this.ismenuRequired=false;
  }
  else{
    this.ismenuRequired=true;
  }
  if(this.service.GetUserrole()==='inventory'){
    this.isInventoryRequired=true;
  }
  else{
    this.isInventoryRequired=false;
  }
  
    // if(this.service.GetUserrole()==="Inventory"){
    //     this.isInventoryRequired=true;
    // }
    // else{
    //   this.isInventoryRequired=false;
    // }
    
    if(this.service.GetUserrole()==="delivery"){
      this.isDeliveryRequired=true;
    }
    else{
      this.isDeliveryRequired=false;
    }
    if(this.service.IsLoggedIn()){
      this.isLoginRequired=false;
    }
    else{
      this.isLoginRequired=true;
    }
}

}
