import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';
export const routes: Routes = [
    {
        path:'table',
        component:TableComponent
    },
    {
        path:'',
        component:HomeComponent
    }
];
