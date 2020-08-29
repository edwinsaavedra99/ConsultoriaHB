import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NewsComponent } from './news.component'
import { ListComponent } from './list/list.component'
import { FormComponent } from './form/form.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    NewsComponent,
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
  exports:[ NewsComponent ],
  bootstrap: [ NewsComponent ],
  providers:[]
})
export class NewsModule { }
