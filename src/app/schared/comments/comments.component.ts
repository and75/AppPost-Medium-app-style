/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppService } from '../../app.service';
import { Comment } from '../../_models/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnChanges {

  @Input('entity') entity;

  comments: Comment[] = null;
  comment: Comment = null
  changeLog: string[] = [];
  constructor(private appService: AppService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.comment = new Comment();
    for (const propName in changes) {
      if (propName == 'entity') {
        let changedProp = changes[propName];
        let entityGuid = changedProp.currentValue.guid;
        this.getCommentsByEntityId(entityGuid);
      }
    }
  }

  getCommentsByEntityId(id: number): void {
    this.appService.getCommentsByEntityId(id).subscribe((res: any) => {
      if (res.status == 0 && res.result) {
        this.comments = res.result;
      } else {
        this.comments = null;
      }
    });
  }

  clearTextArea(event: any) {
    event.target.value=null;
  }

  onSubmit() {
    this.appService.saveComment(this.entity.guid, this.comment.body).subscribe((res: any) => {
      if (res.status == 0) {
        this.getCommentsByEntityId(this.entity.guid);
        this.comment = new Comment();
      }
    });
  }

}
