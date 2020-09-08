import { Routes, RouterModule} from '@angular/router';
import { InfoComponent } from './info/info.component'
import { UsersComponent } from './users/users.component';
import { RequestsComponent } from './requests/requests.component';
import { NewsComponent } from './news/news.component'
import { ContactComponent} from './contact/contact.component'
import { LegalAreasComponent } from './legal-areas/legal-areas.component';
import { AuthGuard } from '../../../guard/auth.guard';

import { NgModule } from '@angular/core';
import { from } from 'rxjs';
//    canActivate: [AuthGuard]

export const DynamicRoutes: Routes =[
    { path: 'info',             component: InfoComponent, canActivate: [AuthGuard] }, 
    { path: 'contact',             component: ContactComponent, canActivate: [AuthGuard] },
    { path: 'legal-areas',             component: LegalAreasComponent, canActivate: [AuthGuard] },
    { path: 'news',             component: NewsComponent, canActivate: [AuthGuard] },
    { path: 'requests',             component: RequestsComponent, canActivate: [AuthGuard] },
    { path: 'users',             component: UsersComponent, canActivate: [AuthGuard] },
    //{ path: 'login',          component: LoginComponent },
    //{ path: 'perfil-client',         component: PerfilClientComponent,canActivate:[AdminGuard]}
];
