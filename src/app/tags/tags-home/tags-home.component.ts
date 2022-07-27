/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 * @package Tags Module
 */

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Post } from '../../_models/post';

@Component({
  selector: 'app-tags-home',
  templateUrl: './tags-home.component.html'
})

export class TagsHomeComponent implements OnInit {

  tagSlug:string = '';
  posts:Post[] = null;
  contributors:any[]= null;
  title:string = '';

  constructor(
    private titleService: Title,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {   
    this.route.paramMap.subscribe(params => {
      this.tagSlug = this.route.snapshot.params['slug'];
      this.titleService.setTitle('Tags / '+this.tagSlug);
      this.title = 'Tag : '+this.tagSlug;
      this.getPostByTagSlug(this.tagSlug);    
    });
  }

  getPostByTagSlug(tag:string){
    this.appService.getEntitiesByTag(tag).subscribe((res: any) => {
      if (res.entities && res.contributors) {
        this.posts = res.entities;
        this.contributors = res.contributors;
      }
    });
  }

  goToPost(post: Post) {
    let link = ['/post/view', post.guid];
    this.router.navigate(link);
  }

}
