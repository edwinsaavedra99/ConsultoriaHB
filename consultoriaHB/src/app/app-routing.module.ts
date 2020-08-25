import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { DynamicComponent } from './components/admin/dynamic/dynamic.component';
import { IndexComponent } from './components/client/dynamic/index/index.component';
import { LoginComponent } from './components/admin/login/login.component'
const routes: Routes = [
  { path: '', component: IndexComponent },  
  {
    path: 'admin', component: DynamicComponent, pathMatch: 'prefix',
    children: [
      {
        path: '',
        loadChildren: './components/admin/dynamic/dynamic.module#DynamicModule'
      }
    ]
  },
  { path: 'index',   redirectTo: '', pathMatch: 'full' },
  { path: 'login',   component: LoginComponent },
  //{ path: '**', component: PageNotFound}
  //{ path: '**', component: PageNotFound}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
