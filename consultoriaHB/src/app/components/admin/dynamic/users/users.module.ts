import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component'
import { ListComponent} from './list/list.component'
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    UsersComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports:[ UsersComponent ],
  bootstrap: [ UsersComponent ],
  providers: []
})
export class UsersModule { }
