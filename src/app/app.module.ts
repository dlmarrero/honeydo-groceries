import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GroceriesModule } from './groceries/groceries.module';
import { DashboardModule } from './dashboard/dashboard.module'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GroceriesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
