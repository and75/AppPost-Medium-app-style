/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { Component, Input, OnChanges,SimpleChanges  } from '@angular/core';
import { AppService } from '../../app.service';
import { Post } from '../../_models/post';

@Component({
  selector: 'app-social-menu',
  templateUrl: './social-menu.component.html'
})
export class SocialMenuComponent implements OnChanges {

  @Input() post: Post; // propriété d'entrée du composant
  ideas:number = 0;
  likes:number = 0;
  loves:number = 0;

  constructor(private appService:AppService) {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName == 'post') {
        let changedProp = changes[propName];
        this.ideas = changedProp.currentValue.ideas;
        this.likes = changedProp.currentValue.likes;
        this.loves = changedProp.currentValue.loves;
      }
    }
  }

  setBeastIdea(){
    this.appService.createAnnotation(this.post.guid, 'ideas')
    .subscribe(res => {
      if(res.status==0){
        this.ideas = res.result;
      }
    });
  }

  setLikePost(){
    this.appService.createAnnotation(this.post.guid, 'likes')
    .subscribe(res => {
      if(res.status==0){
        this.likes = res.result;
      }
    });
  }

  setLovePost(){
    this.appService.createAnnotation(this.post.guid, 'loves')
    .subscribe(res => {
      if(res.status==0){
        this.loves = res.result;
      }
    });
  }

}
