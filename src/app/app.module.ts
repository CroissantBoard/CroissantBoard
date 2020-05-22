import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment.prod';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material.module';
import { CoreModule } from './core/core.module';

import {HomeModule} from "./modules/home/home.module";
import {HomeRoutingModule} from "./modules/home/home-routing.module";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
