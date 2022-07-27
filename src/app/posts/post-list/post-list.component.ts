/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 * @package Post Module
 */

import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Post } from '../../_models/post';
import { User } from '../../_models/user';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {

  @Input('owner') owner: User = null;
  posts: Post[] = null;
  title:string = 'Latest posts published';


  constructor(
    private appService: AppService,
    private router: Router) {}

  ngOnInit(): void {
    if (this.owner) {
      this.getPostsByUserId(this.owner.guid);
      this.title = "Latest user's posts"
    } else {
      this.getPosts();
    }
  }

  getPosts(): void {
    this.appService.getPosts().subscribe((res: any) => {
      if (res) {
        this.posts = res.result;
      }
    });
  }

  getPostsByUserId(id: number): void {
    this.appService.getPostsByUserId(id).subscribe((res: any) => {
      if (res) {
        this.posts = res.result;
      }
    });
  }

  goToPost(post: Post) {
    let link = ['/post/view', post.guid];
    this.router.navigate(link);
  }
}
