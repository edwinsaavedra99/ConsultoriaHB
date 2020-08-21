import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LegalAreasComponent } from './legal-areas.component'
import { ListComponent } from './list/list.component'


@NgModule({
  declarations: [
    LegalAreasComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    LegalAreasComponent
  ],
  bootstrap:[
    LegalAreasComponent
  ],
  providers:[]
})
export class LegalAreasModule { }
