import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { InfoComponent } from './info/info.component';
import { LegalAreasComponent } from './legal-areas/legal-areas.component';
import { HomeComponent } from './home/home.component';
import { ContacComponent } from '../../static/contac/contac.component';
import { FooterComponent } from '../../static/footer/footer.component';
import { RequestsFormComponent } from '../../static/write_us/requests-form/requests-form.component';
import { HeaderComponent } from '../../static/header/header.component';
import { WriteUsComponent } from '../../static/write-us/write-us.component';

import { IndexComponent } from './index.component';
import { OneNewComponent } from '../one-new/one-new.component'
import { TarjetaComponent } from './legal-areas/tarjeta/tarjeta.component';
import { PopupAreasComponent } from './legal-areas/popup-areas/popup-areas.component';
//import { ClipboardModule } from 'ngx-clipboard';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,   
    //NgbModule,
    ReactiveFormsModule,
      //ClipboardModule
    CarouselModule
  ],declarations: [
    IndexComponent,
    InfoComponent,
    HomeComponent,
    LegalAreasComponent,
    ContacComponent,
    FooterComponent,
    RequestsFormComponent,
    HeaderComponent,
    WriteUsComponent,
    TarjetaComponent,
    PopupAreasComponent,
    OneNewComponent,
    
  ],
  providers: []
  //bootstrap: [IndexComponent]
})
export class IndexModule { }