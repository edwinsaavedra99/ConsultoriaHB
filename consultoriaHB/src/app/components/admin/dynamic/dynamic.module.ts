import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DynamicRoutes } from './dynamic.routing';
import { RouterModule } from '@angular/router';
import { DynamicComponent } from './dynamic.component';
import { InfoComponent } from './info/info.component';
//import { LegalAreasComponent } from './info/info.component';
//import { NewsComponent } from './info/info.component';
//import { RequestsComponent } from './info/info.component';
//import { UsersComponent } from './info/info.component';
import { MenuBarComponent } from '../static/menu-bar/menu-bar.component';
import { SideBarComponent } from '../static/side-bar/side-bar.component';
import { InfoModule } from './info/info.module';
//import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DynamicRoutes),
    FormsModule,
    HttpClientModule,    
    InfoModule,
    //NgbModule,
    ReactiveFormsModule
      //ClipboardModule
  ],declarations: [
    DynamicComponent,
    MenuBarComponent,
    SideBarComponent
    //InfoComponent,
    //LegalAreasComponent
  ],
  providers: [],
  bootstrap: [DynamicComponent]
})
export class DynamicModule { }
