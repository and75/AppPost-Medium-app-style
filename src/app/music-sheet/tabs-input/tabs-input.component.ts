/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { Component, OnInit,ElementRef } from '@angular/core';
import { MusicScheetService } from '../music-scheet.service';

@Component({
  selector: 'app-tabs-input',
  templateUrl: './tabs-input.component.html'
})
export class TabsInputComponent implements OnInit {

  notes:string[] = [];
  musicSheet: any[] = [];
  tabsModel = {};

  constructor(private musicScheetService:MusicScheetService) {}

  ngOnInit(): void {}

  addRow(replace = false) {
    console.log(this.tabsModel)
    this.musicSheet.push(this.musicScheetService.getTabsModel());
  }

  onClick(event) {
    console.log(event);
  }

  loadTabsElement(e: string) {
    console.log(e);
  }

  change(e:Event) {
    console.log(e);
  }

  clear() {
    this.addRow();
  }

}
