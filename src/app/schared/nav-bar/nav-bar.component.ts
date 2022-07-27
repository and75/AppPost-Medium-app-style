/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { Component, OnInit } from '@angular/core';
import { AppService } from "../../app.service";
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {

  loggedInUser: User;

  constructor(private appService:AppService ) { }

  ngOnInit() {
    this.getLoggedInUser();
  }

  getLoggedInUser(){
    this.appService.getLoggedInUser().subscribe((res: any) => {
      if (res.status == 0 && res.result) {
        this.loggedInUser = res.result;
      } else {
        this.loggedInUser = null;
      }
    });
  }

}
