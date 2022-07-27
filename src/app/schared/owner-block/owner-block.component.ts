/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Post } from'../../_models/post';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-owner-block',
  templateUrl: './owner-block.component.html'
})
export class OwnerBlockComponent implements OnInit {

  @Input('owner') owner = null; // propriété d'entrée du composant
  posts:Post[] = null;
  constructor(private appService:AppService) { }

  ngOnInit(): void {
    console.log('OwnerBlockComponent owner '+this.owner.guid)
  }

}
