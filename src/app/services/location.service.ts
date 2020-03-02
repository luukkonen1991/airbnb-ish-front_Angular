import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Data } from '../models/Data';
// import { Location } from '../models/Location';
import { Location } from '../models/Location';
import { LocationById } from '../models/LocationById';

const httpHeaders = {
	headers: new HttpHeaders({
		'Content-type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class LocationService {
	locationUrl: string = 'http://localhost:5000/api/v1/locations';

	constructor(private http: HttpClient) {}

	getLocations(): Observable<Data> {
		return this.http.get<Data>(this.locationUrl);
	}

	getLocationsWithParams(minPrice?: any, maxPrice?: any, sortInput?: any, animalType?: any): Observable<Data> {
		let params = new HttpParams()
			.set('costAmount[lte]', maxPrice)
			.set('costAmount[gte]', minPrice)
			.set('sort', sortInput);
		if (animalType !== undefined) {
			params = params.append('animalTypes[in]', animalType);
		}
		return this.http.get<Data>(this.locationUrl, { params });
	}

	getLocation(_id: string): Observable<LocationById> {
		const url = `${this.locationUrl}/${_id}`;
		return this.http.get<LocationById>(url, httpHeaders);
	}
}
