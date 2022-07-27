/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 * @package Post Module
 */

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppService } from '../../app.service';
import { Post } from '../../_models/post';


@Component({
  selector: 'app-post-save',
  templateUrl: './post-save.component.html'
})
export class PostSaveComponent implements OnInit {

  post: Post = null;
  returnUrl:string= '/home';
  owner:any=null;
  pageTitle: string = "Add new post";
  content: string = "";
  title: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private appService: AppService

  ) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    if (id) {
      this.pageTitle = "Edit post";
      this.returnUrl= '/post/view/'+id;
      this.getPostById(id);
    } else{
      this.getLoggedInUSer();
    }
    this.titleService.setTitle(this.pageTitle);
  }


  getPostById(id: number): void {
    this.appService.getPost(id).subscribe((res: any) => {
      if (res.status==0) {
        this.post=res.result;
        this.owner= this.post.owner;
      }
    });
  }

  getLoggedInUSer(): void {
    this.appService.getLoggedInUser().subscribe((res: any) => {
      if (res.status==0) {
        this.owner=res.result;
      }
    });
  }

}
