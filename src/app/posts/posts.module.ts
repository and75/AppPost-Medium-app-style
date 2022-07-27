/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 * @package Post Module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule} from './post-routing.module';
import { MusicSheetModule } from '../music-sheet/music-sheet.module';
import { SharedModule } from '../schared/shared.module';
import { PostFormComponent } from './post-form/post-form.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostViewComponent } from './post-view/post-view.component';
import { PostSaveComponent } from './post-save/post-save.component';
import { PostHomeComponent } from './post-home/post-home.component';


@NgModule({
  declarations: [
    PostFormComponent,
    PostListComponent,
    PostViewComponent,
    PostSaveComponent,
    PostHomeComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    MusicSheetModule
  ],
  exports:[
    PostListComponent, PostHomeComponent
  ],
  providers:[]
  
})
export class PostsModule { }
