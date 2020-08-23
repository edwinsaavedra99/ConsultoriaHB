import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';  

import { LegalAreasComponent } from './legal-areas.component'
import { ListComponent } from './list/list.component'

import { FormComponent } from './form/form.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    LegalAreasComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports: [
    LegalAreasComponent
  ],
  bootstrap:[
    LegalAreasComponent
  ],
  providers:[]
})
export class LegalAreasModule { }
