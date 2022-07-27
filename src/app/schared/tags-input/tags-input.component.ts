/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 * @package Tags Module
 */

import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

// RxJS 6
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';

import { Tag } from '../../_models/tag';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html'
})
export class TagsInputComponent implements OnChanges {
  @Input()
  get tagsInput(): string[] { return this._tagsInput; }
  set tagsInput(tagsInput: string[]) {
    this._tagsInput = (tagsInput) || [];
  }
  private _tagsInput:string[];

  @Output() tagsEvent = new EventEmitter<string[]>();

  tags:string[]=[];
  tagquery:string = "";
  results$: Observable<Tag[]>;
  randomFormId:number = Math.floor(Math.random() * 1000);   
  popState = "";
  private tagTerms = new Subject<string>();
  changeLog: string[] = [];
  constructor(
    private appService: AppService,
  ) {}

  ngOnInit(): void {
    this.results$ = this.findExistingTags();
  }

  ngOnChanges(changes: SimpleChanges) {
    const log: string[] = [];
    for (const tagsInput in changes) {
      const changedProp = changes[tagsInput];
      const to = JSON.stringify(changedProp.currentValue);
      if (!changedProp.isFirstChange()) {
        this.tags = this.tagsInput;
        this.randomFormId = Math.floor(Math.random() * 1000);  
      } 
    }
  }

  findExistingTags(){
    return this.tagTerms.pipe(
			debounceTime(300),
			distinctUntilChanged(),
      switchMap((term: string) => this.appService.getTagsByTerm(term))
    );
  }

  filter(term:string, event:KeyboardEvent){
    if(term.length>3 && event.code != 'KeyM'){
      this.tagTerms.next(term);
    } 
    else if(event.code === 'KeyM'){
      term = term.substring(0, term.length - 1);
      this.setTag(term);
    }
    if(this.results$){
      this.popState = "active";
    }
  }

  setTag(value:string){
    this.results$ = null;
    this.popState = "";
    this.tagquery = '';
    this.tags.push(value);
    this.tagsEvent.emit(this.tags);
    this.results$ = this.findExistingTags();
  }

  remove(index:number){
    if (index > -1) {
      this.tags.splice(index, 1);
      this.tagsEvent.emit(this.tags);
    }
  }
}

