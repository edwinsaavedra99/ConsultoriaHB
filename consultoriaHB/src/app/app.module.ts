import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/*FIREBASE SERVICES*/
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/admin/static/side-bar/side-bar.component';
import { MenuBarComponent } from './components/admin/static/menu-bar/menu-bar.component';
import { LoginComponent } from './components/admin/login/login.component';
import { FormComponent } from './components/admin/dynamic/legal-areas/form/form.component';
import { ListComponent } from './components/admin/dynamic/legal-areas/list/list.component';
import { ListComponentInfo } from './components/admin/dynamic/info/list/list.component';
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
import { DynamicModule } from './components/admin/dynamic/dynamic.module';
import { InfoModule } from './components/admin/dynamic/info/info.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
  declarations: [
    
    AppComponent,
    //SideBarComponent,
    //MenuBarComponent,
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
    //ListComponentInfo,
    //InfoComponent,
    LegalAreasComponent,
    RequestsFormComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    BrowserModule,
    AppRoutingModule,    
    BrowserAnimationsModule, 
    DynamicModule
    //InfoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
