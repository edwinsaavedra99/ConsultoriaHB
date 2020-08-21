import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RequestsComponent } from './requests.component'
import { ListComponent } from './list/list.component'

@NgModule({
  declarations: [
    RequestsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[ RequestsComponent ],
  bootstrap: [ RequestsComponent ],
  providers: []
})
export class RequestsModule { }
