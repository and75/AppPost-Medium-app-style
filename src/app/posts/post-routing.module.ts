/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 * @package Post Module
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { PostHomeComponent } from "./post-home/post-home.component";
import { PostViewComponent } from "./post-view/post-view.component";
import { PostSaveComponent } from "./post-save/post-save.component"
// routes
const postsRoutes: Routes = [
  {
    path: 'post',
    canActivate: [AuthGuard],
    children: [
      { path: 'post', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: PostHomeComponent },
      { path: 'view/:id', component: PostViewComponent },
      { path: 'add', component: PostSaveComponent },
      { path: 'edit/:id', component: PostSaveComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(postsRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class PostsRoutingModule {
}
