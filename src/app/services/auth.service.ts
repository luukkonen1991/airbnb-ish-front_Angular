import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { User } from '../models/User';

let httpHeaders = {
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

	constructor(private http: HttpClient, public router: Router, private cookieService: CookieService) {}

	// register
	registerUser(user: User): Observable<any> {
		let api = `${this.authUrl}/register`;
		return this.http.post(api, user);
	}

	// login
	loginUser(email: string, password: string) {
		let data = {
			email: email,
			password: password
		};
		return this.http.post<any>(`${this.authUrl}/login`, data, httpHeaders).subscribe((res: any) => {
			this.cookieService.set('token', res.token);
		});
	}

	// current user
	getMe() {
		let api = `${this.authUrl}/me`;
		let token = this.cookieService.get('token');
		httpHeaders.headers = httpHeaders.headers.append('Authorization', `Bearer ${token}`);
		return this.http.get<User>(api, httpHeaders);
	}
}
