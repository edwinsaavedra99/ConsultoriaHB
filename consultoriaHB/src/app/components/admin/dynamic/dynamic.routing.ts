import { Routes, RouterModule} from '@angular/router';
import { InfoComponent } from './info/info.component'
import { UsersComponent } from './users/users.component';
import { RequestsComponent } from './requests/requests.component';
import { NewsComponent } from './news/news.component'
import { ContactComponent} from './contact/contact.component'
import { LegalAreasComponent } from './legal-areas/legal-areas.component';
//import {AdminGuard} from 'src/app/Services/admin/admin.guard';
import { NgModule } from '@angular/core';
import { from } from 'rxjs';

export const DynamicRoutes: Routes =[
    { path: 'info',             component: InfoComponent }, 
    { path: 'contact',             component: ContactComponent },
    { path: 'legal-areas',             component: LegalAreasComponent },
    { path: 'news',             component: NewsComponent },
    { path: 'requests',             component: RequestsComponent },
    { path: 'users',             component: UsersComponent },
    //{ path: 'login',          component: LoginComponent },
    //{ path: 'perfil-client',         component: PerfilClientComponent,canActivate:[AdminGuard]}
];
