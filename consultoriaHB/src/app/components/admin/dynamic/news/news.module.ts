import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NewsComponent } from './news.component'
import { ListComponent } from './list/list.component'
import { FormComponent } from './form/form.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormNewsModule } from './form/form.module';


@NgModule({
  declarations: [
    NewsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormNewsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CKEditorModule
  ],
  exports:[ NewsComponent ],
  bootstrap: [ NewsComponent ],
  providers:[]
})
export class NewsModule { }
