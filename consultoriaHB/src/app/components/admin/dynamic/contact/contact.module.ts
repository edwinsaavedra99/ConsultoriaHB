import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component'
import { ListComponent } from './list/list.component';
import { CompanyComponent } from './company/company.component'
import { FormsModule } from '@angular/forms';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';  
import {NgxPaginationModule} from 'ngx-pagination';
import { FormComponent } from './form/form.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ContactComponent,
    FormComponent,
    ListComponent,
    CompanyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports:[ ContactComponent ],
  bootstrap:[ ContactComponent]
})
export class ContactModule { }
