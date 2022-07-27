/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 * @package Post Module
 */

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Post } from '../../_models/post';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html'
})
export class PostFormComponent implements OnInit {

  @Input() post: Post; // propriété d'entrée du composant
  types: Array<string>; // types disponibles pour un pokémon : 'Eau', 'Feu', etc ...
  isAddForm: boolean;
  tags:string[] = [];

  public Editor = ClassicEditor;

  constructor(
    private appService: AppService,
    private router: Router) { }

  ngOnInit() {
    if(!this.post){
      this.post = new Post();
    }
    this.isAddForm = this.router.url.includes('add');
  }

  public editorOnReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  setTags(event:string[]) {
    this.tags = event;
    //console.log('setTags', this.tags)
  }

  // La méthode appelée lorsque le formulaire est soumis.
  onSubmit(): void {
    this.appService.savePost(this.post.title, this.post.content, this.post.guid, this.tags)
    .subscribe(res => {
      //console.log(res);
      if(res.status==0){
        this.goTo(res.result);
      }
    });
  }

  goBack(): void {
    let link = ['/post/view', this.post.guid];
    this.router.navigate(link);
  }

  goTo(guid):void{
    let link = ['/post/view', guid];
    this.router.navigate(link);
  }

}
