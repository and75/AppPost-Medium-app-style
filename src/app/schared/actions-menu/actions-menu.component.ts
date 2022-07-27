/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Post } from '../../_models/post';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-actions-menu',
  templateUrl: './actions-menu.component.html'
})
export class ActionsMenuComponent implements OnInit {

  @Input() post: Post; // propriété d'entrée du composant

  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  editPost(post: Post) {
    let link = ['/post/edit', post.guid];
    this.router.navigate(link);
  }

  deletePost(guid: number) {
    this.appService.deletePost(guid)
    .subscribe(res => {
      if(res.status==0){
        let link = ['/home'];
        this.router.navigate(link);
      }
    });
  }

}
