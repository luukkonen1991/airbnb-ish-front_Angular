import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Data } from '../models/Data';

// const httpHeaders = {
// 	headers: new HttpHeaders({
// 		'Content-type': 'application/json'
// 	})
// };

@Injectable({
	providedIn: 'root'
})
export class LocationService {
	locationUrl: string = 'http://localhost:5000/api/v1/locations';

	constructor(private http: HttpClient) {}

	getLocations(): Observable<Data> {
		return this.http.get<Data>(this.locationUrl);
	}

	getLocationsWithParams(minPrice?: any, maxPrice?: any, sortInput?: any): Observable<Data> {
		let params = new HttpParams()
			.set('costAmount[lte]', maxPrice)
			.set('costAmount[gte]', minPrice)
			.set('sort', sortInput);
		return this.http.get<Data>(this.locationUrl, { params });
	}
}
