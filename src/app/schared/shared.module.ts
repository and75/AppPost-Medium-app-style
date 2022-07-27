/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ActionsMenuComponent } from './actions-menu/actions-menu.component';
import { SocialMenuComponent } from './social-menu/social-menu.component';
import { OwnerBlockComponent } from './owner-block/owner-block.component';
import { CommentsComponent } from './comments/comments.component';
import { SearchComponent } from './search/search.component';
import { TagsInputComponent } from './tags-input/tags-input.component';
import { TagsViewComponent } from './tags-view/tags-view.component';

@NgModule({
  imports:      [ 
    CommonModule,
    CKEditorModule , 
    FormsModule],
  declarations: [ 
    NavBarComponent, 
    ActionsMenuComponent, 
    SocialMenuComponent, 
    OwnerBlockComponent, 
    CommentsComponent, 
    SearchComponent,
    TagsInputComponent,
    TagsViewComponent
  ],
  exports:[
    CommonModule, 
    FormsModule, 
    NavBarComponent,   
    ActionsMenuComponent, 
    SocialMenuComponent, 
    CommentsComponent,
    OwnerBlockComponent,
    CKEditorModule,
    SearchComponent,
    TagsInputComponent,
    TagsViewComponent
  ]
})
export class SharedModule { }

