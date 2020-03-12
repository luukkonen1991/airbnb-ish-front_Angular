import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Data } from '../models/Data';
// import { Location } from '../models/Location';
// import { Location } from '../models/Location';
import { LocationById } from '../models/LocationById';
import { UpdateLocation } from '../models/UpdateLocation';

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
	updateLocationData: UpdateLocation;

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

	getOwnedLocation(user: string, createdAt: string): Observable<LocationById> {
		let params = new HttpParams().set('user[in]', user);
		return this.http.get<LocationById>(this.locationUrl, { params });
	}

	getLocation(_id: string): Observable<LocationById> {
		const url = `${this.locationUrl}/${_id}`;
		return this.http.get<LocationById>(url, httpHeaders);
	}

	deleteLocation(_id: string): Observable<LocationById> {
		const url = `${this.locationUrl}/${_id}`;
		let token = sessionStorage.getItem('token');
		httpHeaders.headers = httpHeaders.headers.set('Authorization', `Bearer ${token}`);
		return this.http.delete<LocationById>(url, httpHeaders);
	}

	updateLocation(_id: string, updateLocationData: UpdateLocation, userId: string): Observable<any> {
		let data = {
			photo: updateLocationData.photo,
			title: updateLocationData.title,
			description: updateLocationData.description,
			animalTypes: updateLocationData.animalTypes,
			services: updateLocationData.services,
			address: updateLocationData.address,
			costAmount: updateLocationData.costAmount,
			costType: updateLocationData.costType,
			phone: updateLocationData.phone,
			email: updateLocationData.email,
			user: userId
		};
		console.log(data);
		const url = `${this.locationUrl}/${_id}`;
		let token = sessionStorage.getItem('token');
		httpHeaders.headers = httpHeaders.headers.set('Authorization', `Bearer ${token}`);
		return this.http.put<UpdateLocation>(url, data, httpHeaders);
	}

	createLocation(newLocationData: UpdateLocation, userId: string): Observable<any> {
		let data = {
			photo: newLocationData.photo,
			title: newLocationData.title,
			description: newLocationData.description,
			animalTypes: newLocationData.animalTypes,
			services: newLocationData.services,
			address: newLocationData.address,
			costAmount: newLocationData.costAmount,
			costType: newLocationData.costType,
			phone: newLocationData.phone,
			email: newLocationData.email,
			user: userId
		};
		let token = sessionStorage.getItem('token');
		httpHeaders.headers = httpHeaders.headers.set('Authorization', `Bearer ${token}`);
		return this.http.post<UpdateLocation>(this.locationUrl, data, httpHeaders);
	}
}
