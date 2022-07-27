/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { PostHomeComponent } from "./posts/post-home/post-home.component";
import { PageNotfoundComponent } from "./page-notfound/page-notfound.component";

// routes
const appRoutes: Routes = [{
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: PostHomeComponent },
      { path: '**', component: PageNotfoundComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
