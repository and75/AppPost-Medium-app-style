/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'app-test';
  stateFlagOne = true;
  stateFlagTwo = false;
  constructor(private authService: AuthService,  private router: Router) { }

  ngOnInit() {
    console.log('AppComponentInit');
    //Ctrl the validity of token when app start
    this.appCtrlToken();
  }

  appCtrlToken(){
    this.authService.ctrlToken().subscribe((res: any) => {
      if (res && res.status=='-1') {
        this.authService.logout();
        this.router.navigate(['authentication']);
      }
    });
  }
   
}
