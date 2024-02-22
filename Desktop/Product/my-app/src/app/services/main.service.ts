import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Product';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { application, response } from 'express';
import { stat } from 'fs';
import { json } from 'stream/consumers';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  private url = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  GetUserrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  IsLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }
  getProducts(username: any,password: any): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/deliveryByUsername/${username}`,{
      headers:{
        Authorization:'Basic '+btoa(username + ':' +password)
      }
    })
  }
  getInventoryProducts(username: any,password: any): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/inventoryProducts`,{
      headers:{
        Authorization:'Basic '+btoa(username + ':' +password)
      }
    })
  }
  public login(username: any,password: any){
    return this.http.get(`${this.url}/login`,{
      headers:{
        Authorization:'Basic '+btoa(username + ':' +password)
      },
      params:{
        username:username,
        password:password
      }
    })
  }
  public getStatus(id: number,status: any,username: any, password: any){
    console.log(username);
    console.log(password);
    return this.http.get(`${this.url}/statusUpdate`,{
      headers:{
        Authorization:'Basic '+btoa(username + ':' +password)
      },
      params:{
        id:id,
        status:status
      }
      
      
    })
  }
  public assignDelivery(username:any,password: any,user: any,id: number){
    return this.http.get(`${this.url}/assignDelivery`,{
      headers:{
        Authorization:'Basic '+btoa(username + ':' +password)
      },
      params:{
        id:id,
        username:user
      }
    })
  }
  public getPosition(username: any, password: any,id: number){
    return this.http.get(`${this.url}/getPosition`,{
      headers:{
        Authorization:'Basic '+btoa(username + ':' +password)
      },
      params:{
        id:id
      }
    }
    
    )
  }
  getDeliveryReport(username: any,password: any): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/deliveryReport`,{
      headers:{
        Authorization:'Basic '+btoa(username + ':' +password)
      },
      params:{
        username:username
      }
    })
  }
  getCountPerishable(username: any, password: any): Observable<number>{
    return this.http.get<number>(`${this.url}/perishableProducts`,{
      headers:{
        Authorization: 'Basic '+btoa(username + ':' +password)
      }
    })
  }
  getCountDamaged(username: any, password: any): Observable<number>{
    return this.http.get<number>(`${this.url}/countDamaged`,{
      headers:{
        Authorization:'Basic '+btoa(username + ':' +password)
      }
    })
  }
  getCountPending(username: any, password: any):Observable<number>{
    return this.http.get<number>(`${this.url}/countPending`,{
      headers:{
        Authorization:'Basic '+btoa(username + ':' +password)
      }
    })
  }
  getCountDelivered(username:any,password: any):Observable<number>{
    return this.http.get<number>(`${this.url}/countDelivered`,{
      headers:{
        Authorization:'Basic '+btoa(username + ':' +password)
      }
    })
  }
}
