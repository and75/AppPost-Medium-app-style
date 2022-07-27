/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsInputComponent } from './tabs-input/tabs-input.component';
import { TabDirective } from './tabs.directive';
import { SafeHtmlPipe } from './safe-html.pipe';

import { MusicScheetService } from './music-scheet.service';

@NgModule({
  declarations: [TabsInputComponent, TabDirective, SafeHtmlPipe],
  exports:      [TabsInputComponent,TabDirective, SafeHtmlPipe],
  providers:    [MusicScheetService],
  imports: [
    CommonModule
  ]  
})
export class MusicSheetModule { }
