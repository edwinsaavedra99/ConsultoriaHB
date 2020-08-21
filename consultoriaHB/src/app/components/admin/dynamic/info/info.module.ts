import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';  
import { InfoComponent } from './info.component';
import { ListComponentInfo } from './list/list.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    InfoComponent,
    FormComponent,
    ListComponentInfo
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
//    NgbModule
  ],
  exports:[ InfoComponent],
  bootstrap: [InfoComponent],
  providers: []
})
export class InfoModule { }
