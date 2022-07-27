/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 * @package Tags Module
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { TagsHomeComponent } from "./tags-home/tags-home.component";
// routes
const tagsRoutes: Routes = [
  {
    path: 'tags/:slug',
    canActivate: [AuthGuard],
    component: TagsHomeComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(tagsRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class TagsRoutingModule { }
