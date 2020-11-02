import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketComponent } from './ticket/ticket.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule, BASE_PATH } from 'frontend-api';

@NgModule({
  declarations: [
    AppComponent,
    TicketComponent
  ],
  imports: [
    ApiModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [ {provide: BASE_PATH, useValue: 'http://localhost:8080'} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
