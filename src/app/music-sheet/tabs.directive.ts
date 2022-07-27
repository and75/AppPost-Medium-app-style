/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[app-musicsheet-tab]'
})
export class TabDirective {

  isMoving = false;
  dragging:any = '';

  constructor(private el: ElementRef) { }

  
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  @HostListener('mousedown', ['$event']) onMousedown(e:any) {
    e.preventDefault()
    this.isMoving = true
    this.dragging = e.target
    //console.log('dragging element:', this.dragging);
  }

  @HostListener('mouseup', ['$event']) onMouseup(e:any) {
    e.preventDefault()
    this.isMoving = false
    this.dragging = '';
  }

  @HostListener('click') onClick() {
    this.setInput();
  }

  @HostListener('mousemove', ['$event']) onMousemove(e:any) {
    this.dragElement(e);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  private setInput() {
    let e = this.el.nativeElement;
    //console.log(e.innerHTML);
    let content = e.innerHTML;
    e.innerHTML = '<input class="tabs-input">';
    let input = e.querySelector("input")
    //console.log(input);
    input.style.width = '1rem';
    if(content != "-") input.value = content;
    input.focus()
    input.addEventListener("blur", b => {
      var value = b.target.value != "" ? b.target.value : "-"
      e.innerHTML = `${value}`
    })
    e.style.backgroundColor = 'red';
  }

  private dragElement(e:any){
    //console.log('isMoving', this.isMoving)
    if(this.isMoving){
      var old = this.dragging.innerHTML
      var neww = e.target.innerHTML
      this.dragging.innerHTML = neww
      e.target.innerHTML = old
      this.dragging = e.target
    }
  }

}
