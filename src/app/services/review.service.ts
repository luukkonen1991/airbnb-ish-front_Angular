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

	getLocationReviews(locationId: string) {
		let api = `http://localhost:5000/api/v1/locations/${locationId}/reviews`;
		return this.http.get<Reviews>(api).pipe(catchError(this.handleError));
	}

	createLocationReview() {}

	handleError(error: HttpErrorResponse) {
		return throwError(error);
	}
}
