import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { DynamicComponent } from './components/admin/dynamic/dynamic.component';

const routes: Routes = [
    {
    path: 'admin', component: DynamicComponent, pathMatch: 'prefix',
    children: [
      {
        path: '',
        loadChildren: './components/admin/dynamic/dynamic.module#DynamicModule'
      }
    ]
},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
