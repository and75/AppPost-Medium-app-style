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
import { Tag } from '../../_models/tag';
import { Comment } from '../../_models/comment';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-post-home',
  templateUrl: './post-home.component.html'
})
export class PostHomeComponent implements OnInit {

  postId: number = null;
  posts: Post[] = null;
  post: Post = null;
  postComments: Comment[] = null;
  owner :any = null;
  title:string ='Latest posts publisched';
  mostUsedTags:Tag[] = null;
  greatsIdeas:Post[] = null;
  mostLiked:Post[] = null;
  mostLoved:Post[] = null;

  constructor(
    private titleService: Title,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.titleService.setTitle('Home');
    this.getLatestPosts();
    this.getMostUsedTags();
    this.getMostLiked();
    this.getMostLoved();
    this.getGreatIdeas();
  }

  getLatestPosts(): void {
    this.appService.getPosts().subscribe((res: any) => {
      if (res.status==0) {
        this.posts = res.result;
      }
    });
  }

  getMostUsedTags(){
    this.appService.getMostUsedTags().subscribe((res: any) => {
      if (res.status==0) {
        this.mostUsedTags = res.result;
      }
    });
  }

  getMostLiked(){
    this.appService.getPostByAnnotation('likes').subscribe((res: any) => {
      if (res.status==0) {
        this.mostLiked = res.result;
      }
    });
  }

  getMostLoved(){
    this.appService.getPostByAnnotation('loves').subscribe((res: any) => {
      if (res.status==0) {
        this.mostLoved = res.result;
      }
    });
  }
  getGreatIdeas(){
    this.appService.getPostByAnnotation('ideas').subscribe((res: any) => {
      if (res.status==0) {
        this.greatsIdeas = res.result;
      }
    });
  }

  goToPost(post: Post) {
    let link = ['/post/view', post.guid];
    this.router.navigate(link);
  }

}

