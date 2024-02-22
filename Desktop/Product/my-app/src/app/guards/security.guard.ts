import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { MainService } from '../services/main.service';
export const securityGuard: CanActivateFn = (route, state) => {
  const currentmenu=route.url[0].path;
  const router = inject(Router);
  const service = inject(MainService);
  if (service.IsLoggedIn()) {
    console.log("entering");
    if (route.url.length > 0) {
      let menu = route.url[0].path;
      if (menu == 'inventory' || menu=='inventoryProducts' || menu=='dashboard') {
        if (service.GetUserrole() == 'inventory') {
          console.log("userolematched")
          return true;
        } else {
          router.navigate(['']);
          alert('You dont have access.')
          return false;
        }
      }
      else if(menu=='delivery' || menu=='product'){
        if(service.GetUserrole()=='delivery'){
          return true;
        }
        else{
          router.navigate(['']);
          alert("You don't have access");
          return false;
        }
      }
      else{
        return true;
      }
    } 
    else{
      return true;
    }
    
  }
  else{
    router.navigate(['login']);
    return false;
  }
  
  
};
