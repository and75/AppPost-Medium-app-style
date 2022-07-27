/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { NgModule } from '@angular/core';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
