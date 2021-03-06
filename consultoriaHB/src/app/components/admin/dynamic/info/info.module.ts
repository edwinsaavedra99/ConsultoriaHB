import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';  
import { InfoComponent } from './info.component';
import { ListComponentInfo } from './list/list.component';
import { FormComponent } from './form/form.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { FormInfoModule } from './form/form.module';
@NgModule({
  declarations: [
    InfoComponent,
    //FormComponent,
    ListComponentInfo
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormInfoModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule
    //NgModule
  ],
  exports:[ InfoComponent],
  bootstrap: [InfoComponent],
  providers: []
})
export class InfoModule { }
