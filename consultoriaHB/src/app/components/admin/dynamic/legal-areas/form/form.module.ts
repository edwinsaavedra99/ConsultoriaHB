import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormComponent } from './form.component';

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CKEditorModule
  ],
  exports:[FormComponent ],
  bootstrap: [ ],
  providers:[]
})
export class FormLegalAreasModule { }
