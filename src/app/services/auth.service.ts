import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../services/data.service';

import { User } from '../models/User';
import { AuthRegister } from '../models/AuthRegister';

let httpHeaders = {
	headers: new HttpHeaders({
		'Content-type': 'application/json'
	})
};

let httpHeadersPost = {
	headers: new HttpHeaders({
		'Content-type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authUrl: string = 'http://localhost:5000/api/v1/auth';
	token: string;
	authRegister: AuthRegister;

	constructor(
		private http: HttpClient,
		public router: Router,
		private cookieService: CookieService,
		private dataService: DataService
	) {}

	// register
	registerUser(authRegister: AuthRegister) {
		let api = `${this.authUrl}/register`;
		let data = {
			name: authRegister.name,
			email: authRegister.email,
			password: authRegister.password
		};
		return this.http.post<any>(api, data, httpHeaders).subscribe(
			(res: any) => {
				// this.cookieService.set('token', res.token);
				sessionStorage.setItem('token', res.token);
				this.dataService.changeLoginResponse(res.success);
			},
			error => {
				this.dataService.changeLoginResponse(error.statusText);
			}
		);
	}

	// login
	loginUser(email: string, password: string) {
		let data = {
			email: email,
			password: password
		};

		let expiredDate = new Date();
		expiredDate.setDate(expiredDate.getDate() + 7);

		return this.http.post<any>(`${this.authUrl}/login`, data, httpHeaders).subscribe(
			(res: any) => {
				// this.cookieService.set('token', res.token, expiredDate, null, null, false);
				sessionStorage.setItem('token', res.token);
				this.dataService.changeLoginResponse(res.success);
				// this.dataService.currentResponse.subscribe(msg => (res.success = msg));
				// alert(`Success: ${res.success}`);
			},
			error => {
				// this.dataService.currentResponse.subscribe(msg => (error.statusText = msg));
				this.dataService.changeLoginResponse(error.statusText);
			}
		);
	}

	// current user
	getMe(): Observable<User> {
		let api = `${this.authUrl}/me`;
		// let token = this.cookieService.get('token');
		let token = sessionStorage.getItem('token');
		httpHeaders.headers = httpHeaders.headers.set('Authorization', `Bearer ${token}`);
		return this.http.get<User>(api, httpHeaders);
	}

	// Forgot password
	forgotPassword(email: string): Observable<any> {
		let api = `${this.authUrl}/forgotpassword`;
		let data = {
			email: email
		};
		return this.http.post<any>(api, data, httpHeaders);
	}

	resetPassword(token: string, password: string) {
		let api = `${this.authUrl}/resetpassword/${token}`;
		let data = {
			password: password
		};
		return this.http.put<any>(api, data, httpHeaders);
	}
}
