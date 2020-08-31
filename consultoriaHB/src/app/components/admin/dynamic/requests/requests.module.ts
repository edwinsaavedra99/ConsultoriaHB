import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RequestsComponent } from './requests.component'
import { ListComponent } from './list/list.component'
import { FormComponent} from './form/form.component';
import { ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { DeviceDetectorService } from 'ngx-device-detector';
@NgModule({
  declarations: [
    RequestsComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
    ReactiveFormsModule
    //DeviceDetectorService
  ],
  exports:[ RequestsComponent ],
  bootstrap: [ RequestsComponent ],
  providers: []
})
export class RequestsModule { }
