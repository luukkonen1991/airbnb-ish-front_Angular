import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Reviews } from '../models/Reviews';
import { Review } from '../models/Review';

const httpHeaders = {
	headers: new HttpHeaders({
		'Content-type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class ReviewService {
	reviewUrl: string = 'http://localhost:5000/api/v1/reviews';
	review: Review;
	reviews: Reviews;
	constructor(private http: HttpClient) {}

	getAllReviews(limit?) {
		let token = sessionStorage.getItem('token');
		let options = {
			params: new HttpParams().set('limit', limit),
			headers: httpHeaders.headers.set('Authorization', `Bearer ${token}`)
		};
		return this.http.get<Reviews>(this.reviewUrl, options).pipe(catchError(this.handleError));
	}

	getLocationReviews(locationId: string) {
		let api = `http://localhost:5000/api/v1/locations/${locationId}/reviews`;
		return this.http.get<Reviews>(api).pipe(catchError(this.handleError));
	}

	createLocationReview(locationId: string, review: Review) {
		let data = {
			title: review.title,
			text: review.text,
			rating: review.rating
		};
		let api = `http://localhost:5000/api/v1/locations/${locationId}/reviews`;
		let token = sessionStorage.getItem('token');
		httpHeaders.headers = httpHeaders.headers.set('Authorization', `Bearer ${token}`);
		return this.http.post<Review>(api, data, httpHeaders).pipe(catchError(this.handleError));
	}

	deleteReview(_id: string): Observable<Review> {
		const url = `${this.reviewUrl}/${_id}`;
		let token = sessionStorage.getItem('token');
		httpHeaders.headers = httpHeaders.headers.set('Authorization', `Bearer ${token}`);
		return this.http.delete<Review>(url, httpHeaders).pipe(catchError(this.handleError));
	}

	handleError(error: HttpErrorResponse) {
		return throwError(error);
	}
}
