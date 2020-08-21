import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NewsComponent } from './news.component'
import { ListComponent } from './list/list.component'

@NgModule({
  declarations: [
    NewsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[ NewsComponent ],
  bootstrap: [ NewsComponent ],
  providers:[]
})
export class NewsModule { }
