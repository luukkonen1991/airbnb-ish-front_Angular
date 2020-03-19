import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ContactMessage } from '../models/ContactMessage';

let httpHeaders = {
	headers: new HttpHeaders({
		'Content-type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class ContactService {
	messageUrl: string = 'http://localhost:5000/api/v1/messages';

	constructor(
		private http: HttpClient,
		public router: Router,
	) {}

	getAllMessages(limit?: any): Observable<any> {
		let api = this.messageUrl;
		let token = sessionStorage.getItem('token');
		let options = {
			params: new HttpParams().set('limit', limit),
			headers: httpHeaders.headers.set('Authorization', `Bearer ${token}`)
		};
		return this.http.get<any>(api, options).pipe(catchError(this.handleError));
	}

	sendMessage(name: string, email: string, phone: string, message: string) {
		let api = `${this.messageUrl}/`;
		let data = {
			name: name,
			email: email,
			phone: phone,
			msg: message
		};
		return this.http.post<ContactMessage>(api, data, httpHeaders).pipe(catchError(this.handleError));
	}

	deleteMessage(_id: string): Observable<ContactMessage> {
		const url = `${this.messageUrl}/${_id}`;
		let token = sessionStorage.getItem('token');
		httpHeaders.headers = httpHeaders.headers.set('Authorization', `Bearer ${token}`);
		return this.http.delete<ContactMessage>(url, httpHeaders).pipe(catchError(this.handleError));
	}

	handleError(error: HttpErrorResponse) {
		return throwError(error);
	}
}
