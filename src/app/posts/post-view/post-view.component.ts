/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 * @package Post Module
 */

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Post } from '../../_models/post';
import { Comment } from '../../_models/comment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html'
})
export class PostViewComponent implements OnInit {

  postId: number = null;
  posts: Post[] = null;
  post: Post = null;
  postComments: Comment[] = null;
  owner: any = null;

    constructor(
    private titleService: Title,
    private appService: AppService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.titleService.setTitle('Post detail');
    /*Set content on url change*/
    this.route.paramMap.subscribe(params => {
      this.postId = +this.route.snapshot.params['id'];
      if(this.postId){
        this.viewPost();
      } 
    });
  }

  getPostById(id: number): void {
    this.appService.getPost(id).subscribe((res: any) => {
      if (res.status==0) {
        this.post = res.result;
        this.owner =  this.post.owner;
      }
    });
  }

  viewPost(): void {
    this.getPostById(this.postId);
  }

}
