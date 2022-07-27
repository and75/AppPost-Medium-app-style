/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

// RxJS 6
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';

import { Post } from '../../_models/post';
import { AppService } from '../../app.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  query:string = "";
  searchOn:string="post";
  searchedPost$: Observable<Post[]>;
  private searchTerms = new Subject<string[]>();

  constructor(
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchedPost$ = this.searchPost();
  }

  searchPost(){
    return this.searchTerms.pipe(
			debounceTime(300),
			distinctUntilChanged(),
      switchMap((search: string[]) => this.appService.appSearch(search))
    );
  }

  filter(term:string){
    const search = [term,  this.searchOn];
    this.searchTerms.next(search);
  }

  goTo(entity:any){
    this.searchedPost$ = null;
    this.query = null;
    if(this.searchOn=="post"){
      let link = ['/post/view', entity.guid];
      this.router.navigate(link); 
    } else if(this.searchOn=="tags"){
      let slug = entity.tag;
      let tSlug = slug.toLowerCase(); 
      let link = ['/tags/', tSlug];
      this.router.navigate(link);
    }
    this.searchedPost$ = this.searchPost();
  }

}
