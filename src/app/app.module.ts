/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './auth-guard.service';
import { LocalStorageService } from './local-storage.service';
import { AppService } from './app.service';

import { AppRoutingModule } from './app-routing.module';
import { AuthenticationRoutingModule } from './auth-routing.module';
import { SharedModule } from './schared/shared.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    PageNotfoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PostsModule,
    TagsModule,
    AuthenticationRoutingModule,
    AppRoutingModule,
  ],
  providers: [AuthGuard, LocalStorageService, AppService],
	bootstrap: [AppComponent]
})
export class AppModule { }
