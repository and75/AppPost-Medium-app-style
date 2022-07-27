/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationComponent } from "./authentication/authentication.component";

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: 'authentication', component: AuthenticationComponent }
		])
	],
	exports: [
		RouterModule
	]
})
export class AuthenticationRoutingModule { }
