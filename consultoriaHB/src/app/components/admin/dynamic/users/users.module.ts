import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component'
import { ListComponent} from './list/list.component'
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UsersComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[ UsersComponent ],
  bootstrap: [ UsersComponent ],
  providers: []
})
export class UsersModule { }
