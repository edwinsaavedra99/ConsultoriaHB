import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/admin/static/side-bar/side-bar.component';
import { MenuBarComponent } from './components/admin/static/menu-bar/menu-bar.component';
import { LoginComponent } from './components/admin/login/login.component';
import { FormComponent } from './components/admin/dynamic/legal-areas/form/form.component';
import { ListComponent } from './components/admin/dynamic/legal-areas/list/list.component';
import { WriteUsComponent } from './components/client/static/write-us/write-us.component';
import { FooterComponent } from './components/client/static/footer/footer.component';
import { HeaderComponent } from './components/client/static/header/header.component';
import { ContacComponent } from './components/client/static/contac/contac.component';
import { NewsComponent } from './components/client/dynamic/news/news.component';
import { IndexComponent } from './components/client/dynamic/index/index.component';
import { HomeComponent } from './components/client/dynamic/index/home/home.component';
import { InfoComponent } from './components/client/dynamic/index/info/info.component';
import { LegalAreasComponent } from './components/client/dynamic/index/legal-areas/legal-areas.component';
import { RequestsFormComponent } from './components/client/static/write_us/requests-form/requests-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    MenuBarComponent,
    LoginComponent,
    FormComponent,
    ListComponent,
    WriteUsComponent,
    FooterComponent,
    HeaderComponent,
    ContacComponent,
    NewsComponent,
    IndexComponent,
    HomeComponent,
    InfoComponent,
    LegalAreasComponent,
    RequestsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
