import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component'
import { ListComponent} from './list/list.component'
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule} from '@angular/forms';

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
    ReactiveFormsModule
  ],
  exports:[ UsersComponent ],
  bootstrap: [ UsersComponent ],
  providers: []
})
export class UsersModule { }
