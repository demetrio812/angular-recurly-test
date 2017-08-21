import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RecurlyFormComponent} from './recurly-form/recurly-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RecurlyFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
