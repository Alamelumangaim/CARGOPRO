import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { MainService } from '../../services/main.service';
import { error } from 'console';
declare const L:any;
@Component({
  selector: 'app-track',
  standalone: true,
  imports: [],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})
export class TrackComponent implements OnInit{
  constructor(private fb: FormBuilder,private dialogRef: DialogRef<TrackComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private http: HttpClient,private service: MainService) {}
  ngOnInit(): void {
    this.service.getPosition(sessionStorage.getItem('username'),sessionStorage.getItem('password'),this.data.productid).subscribe(
      (resultData:any)=>{
        console.log(resultData.lat);
        console.log(resultData.lon);
        let map = L.map('map').setView([resultData.lat,resultData.lon], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        let myIcon = L.icon({
          iconUrl: "../../../assets/images/placeholder.png"
})
        let marker = L.marker([resultData.lat,resultData.lon],{icon: myIcon}).addTo(map);
        marker.bindPopup("<b>Hello!</b><br>You are here.").openPopup();
      }
    )
      if(!navigator.geolocation){
        console.log("");
      }
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          console.log(`lat: ${position.coords.latitude},lan:${position.coords.longitude}`);
         
        }
      )
      this.watchPosition();
  }
  watchPosition(){
    let deslat = 0;
    let deslon = 0;
    let id =navigator.geolocation.watchPosition(
      (position)=>{
        console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);
        if(position.coords.latitude==deslat && position.coords.longitude==deslon){
          navigator.geolocation.clearWatch(id);
        }
      },
      
      (error)=>{
        console.log(error);
      },{
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0
      }
    )
  }
}
