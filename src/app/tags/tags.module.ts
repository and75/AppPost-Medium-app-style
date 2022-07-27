/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 * @package Tags Module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsRoutingModule } from './tags-routing.module';
import { SharedModule } from '../schared/shared.module';
import { TagsHomeComponent } from './tags-home/tags-home.component';


@NgModule({
  declarations: [
    TagsHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    TagsRoutingModule],
})
export class TagsModule { }
