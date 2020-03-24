import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
	reviews: Review[];
	constructor(private http: HttpClient) {}

	getLocationReviews(locationId: string) {
		let api = `http://localhost:5000/locations/${locationId}/reviews`;
		return this.http.get<Review[]>(api).pipe(catchError(this.handleError));
	}

	handleError(error: HttpErrorResponse) {
		return throwError(error);
	}
}
