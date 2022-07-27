/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent implements OnInit {

  title = 'app-test';
  stateFlagOne = true;
  stateFlagTwo = false;
  message: string = 'You are logged out. (Sincere@april.biz/b&pj3e0~)';
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private titleService: Title,
    private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Authentication');
    if (this.authService.isLoggedIn()) {
      this.logout();
    }
    
  }

  ngOnDestroy(): void {
    this.email = '';
    this.password = '';
  }

  tooglePannel(id: string) {
    if (id == 'collapseOne') {
      this.stateFlagOne = true;
      this.stateFlagTwo = false;
    }
    if (id == 'collapseTwo') {
      this.stateFlagOne = false;
      this.stateFlagTwo = true;
    }
  }

  setBtnClasses(id: string) {
    if (id == 'collapseOne') {
      return {
        'btn': true,
        'btn-secondary': true,
        'active': this.stateFlagOne,
      };
    }
    if (id == 'collapseTwo') {
      return {
        'btn': true,
        'btn-secondary': true,
        'active': this.stateFlagTwo,
      };
    }
  }

  setPannelClasses(id: string) {
    if (id == 'collapseOne') {
      return {
        'card-body': true,
        'text-left': true,
        'collapse': true,
        'show': this.stateFlagOne,
      };
    }
    if (id == 'collapseTwo') {
      return {
        'card-body': true,
        'text-left': true,
        'collapse': true,
        'show': this.stateFlagTwo,
      };
    }
  }

  // Inform the user about his authentification.
  setMessage(message:any) {
    if(message) {
      this.message = message;
    } else {
      this.message = this.authService.isLoggedIn() ? 'Vous êtes connecté.' : 'Identifiant ou mot de passe incorrect.';
    }    
  }

  // Connects the user to the Guard
  login() {
    this.message = 'Tentative de connexion en cours ...';
    this.authService.login(this.email, this.password).subscribe((res:any) => {
      if (res.status==0) {
        this.authService.setLoggedIn(res.result);
      } else if(res.status=='-1') {
        this.setMessage(res.message);
      }
      if (this.authService.isLoggedIn()) {
        // Retrieve the redirection URL from the authentication service
        // If no redirection has been defined, redirect the user to the list of pokemons.
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
        // Redirect the user
        this.router.navigate([redirect]);
      } else {
        this.email = '';
        this.password = '';
      }
    });
  }


  // Disconnect the user
  logout() {
    this.authService.logout();
    this.router.navigate(['authentication']);
  }

}


