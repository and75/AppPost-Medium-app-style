/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, delay } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { User } from './_models/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	ctrlLoggedIn: boolean = false; //Is the user logged in?
	ctrlAdmin: boolean = false;
	redirectUrl: string; //Where to redirect the user after authentication?
	serviceUrl: string = 'https://jsonplaceholder.typicode.com/';
	private ApiServiceUrl = 'http://app-post-elgg.bsys2.host/services/api/rest/json/?method=';
	roles: object = null;

	constructor(private localStorage: LocalStorageService, private http: HttpClient) { }

	getAuthToken(){
		return this.localStorage.load('authtoken');
	}
	
	setLoggedIn(id: number) {
		let token = "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpva";
		this.localStorage.store('authtoken', id);
		this.localStorage.store('apptoken', token);
	}

	isLoggedIn() {
		if (this.localStorage.load('authtoken')) {
			return this.localStorage.load('authtoken');
		} else {
			return false;
		}
	}

	ctrlToken() : Observable<any> {
		let authToken = this.getAuthToken();
		let ApiUrl = `${this.ApiServiceUrl}user.validatetoken&auth_token=${authToken}`;
		console.log(ApiUrl)
		return this.http.get<any>(ApiUrl).pipe(
				tap(_ => this.log(`fetched ctrlToken `+authToken)),
				catchError(this.handleError<User>(`login`))
		);
	}

	//Connection method
	login(email: string, password: string): Observable<any> {
		const ApiUrl = `${this.ApiServiceUrl}auth.gettoken`;
		var formData: any = new FormData();
		formData.append("username", email);
		formData.append("password", password);
		return this.http.post<any>(ApiUrl, formData)
			.pipe(
				tap(_ => this.log(`fetched login `)),
				catchError(this.handleError<User>(`login`))
			);
	}

	//Disconnection method
	logout(): void {
		this.log(`fetched logout `)
		this.localStorage.remove('authtoken');
		this.localStorage.remove('apptoken');
	}

	/* handleError */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}

	/* log */
	private log(log: string) {
		console.info(log);
	}

}