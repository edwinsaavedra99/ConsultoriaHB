import { Routes, RouterModule} from '@angular/router';
import { InfoComponent } from './info/info.component'
//import { FormClientComponent } from '../../ComponentsClient/orders/form/form.component';
//import { SignupClientComponent } from '../../ComponentsClient/signup/signup.component';
//import { LandingClientComponent } from '../../ComponentsClient/landing/landing.component';
//import { PedidoClientComponent } from '../../ComponentsClient/orders/customize/customize.component';
//import { ExtrasClientComponent } from '../../ComponentsClient/orders/extras/extras.component';
//import { LoginClientComponent } from '../../ComponentsClient/login/login.component';
//import { PerfilClientComponent } from '../../ComponentsClient/perfil/perfil.component';
//import {AdminGuard} from 'src/app/Services/admin/admin.guard';
import { NgModule } from '@angular/core';

export const DynamicRoutes: Routes =[
    { path: 'info',             component: InfoComponent }
    //{ path: 'contact',             component: InvestigacionComponent },
    //{ path: 'legal-areas',             component: InvestigacionComponent },
    //{ path: 'news',             component: InvestigacionComponent },
    //{ path: 'requests',             component: InvestigacionComponent },
    //{ path: 'users',             component: InvestigacionComponent },
    //{ path: 'login',          component: LoginComponent },
    //{ path: 'perfil-client',         component: PerfilClientComponent,canActivate:[AdminGuard]}
];
