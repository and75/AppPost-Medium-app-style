/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 * @package Tags Module
 */

import { Component, Input,  AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Tag } from '../../_models/tag';
@Component({
  selector: 'app-tags-view',
  templateUrl: './tags-view.component.html'
})
export class TagsViewComponent implements  AfterViewInit {

  @Input()tags: Tag[];

  constructor(private router: Router) { }
  
  ngAfterViewInit(): void {}

  onClick(slug:string){
    let tSlug = slug.toLowerCase(); 
    let link = ['/tags/', tSlug];
    this.router.navigate(link);
  }

}
