import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactComponent } from './contact.component'
import { ListComponent } from './list/list.component';
import { CompanyComponent } from './company/company.component'

@NgModule({
  declarations: [
    ContactComponent,
    ListComponent,
    CompanyComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ ContactComponent ],
  bootstrap:[ ContactComponent]
})
export class ContactModule { }
