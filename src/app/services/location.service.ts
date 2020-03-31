import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Data } from '../models/Data';
import { Locations } from '../models/Locations';
import { LocationById } from '../models/LocationById';
import { UpdateLocation } from '../models/UpdateLocation';
import { Pagination } from '../models/Pagination';
import { AnimalTypes } from '../models/AnimalTypes';
import { Form } from '@angular/forms';

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

	getLocations(): Observable<Locations> {
		return this.http.get<Locations>(this.locationUrl);
	}

	getLocationsWithParams(
		minPrice?: any,
		maxPrice?: any,
		sortInput?: any,
		animalTypes?: any,
		services?: any,
		autoCityAndZip?: any,
		autoCity?: any,
		page?: any
	): Observable<Locations> {
		let params = new HttpParams()
			.set('costAmount[lte]', maxPrice)
			.set('costAmount[gte]', minPrice)
			.set('sort', sortInput)
			.set('page', page);
		if (animalTypes !== []) {
			Object.keys(animalTypes).forEach(function(key) {
				params = params.append('animalTypes[in]', animalTypes[key]);
			});
		}
		if (services !== []) {
			Object.keys(services).forEach(function(key) {
				params = params.append('services[in]', services[key]);
			});
		}
		if (autoCityAndZip !== '' && typeof autoCityAndZip === 'string') {
			params = params.append('autocomplete', autoCityAndZip);
		}
		if (autoCity !== '' && typeof autoCity === 'string') {
			params = params.append('autocomplete', autoCity);
		}
		// if (location !== []) {
		// 	if (location.length === 3) {
		// 		// params = params.append('location.zipcode', location[0]);
		// 		params = params.append('location.city', location[1]);
		// 	}
		// 	if (location.length === 2) {
		// 		params = params.append('location.city', location[0]);
		// 	}
		// }
		// if (location !== []) {
		// 	params = params.append('location.zipcode[in]', location[0]);
		// 	params = params.append('location.city[in]', location[1]);
		// 	// params = params.append('location.city[in]', location[0])
		// 	// Object.keys(location).forEach(function(key, index) {
		// 	// 	params = params.append('location.city[in]', location[key]);
		// 	// });
		// }

		// for (let i: number; i < animalTypes.length; i++) {
		// 	console.log(1);
		// 	params = params.append('animalTypes[in]', animalTypes[i]);
		// 	console.log(2);
		// }
		// params = params.append('animalTypes[in]', animalTypes);
		// params = params.append(animalTypes.forEach(animal => {
		//   return 'animalTypes[in]' animal
		// }););
		console.log(params);
		return this.http.get<Locations>(this.locationUrl, { params }).pipe(catchError(this.handleError));
	}

	// getPaginationData(): Observable<Pagination> {
	// 	return this.http.get<Pagination>(this.locationUrl);
	// }

	getOwnedLocation(user: string, createdAt: string): Observable<LocationById> {
		let params = new HttpParams().set('user[in]', user);
		return this.http.get<LocationById>(this.locationUrl, { params }).pipe(catchError(this.handleError));
	}

	getLocation(_id: string): Observable<LocationById> {
		const url = `${this.locationUrl}/${_id}`;
		return this.http.get<LocationById>(url, httpHeaders).pipe(catchError(this.handleError));
	}

	deleteLocation(_id: string): Observable<LocationById> {
		const url = `${this.locationUrl}/${_id}`;
		let token = sessionStorage.getItem('token');
		httpHeaders.headers = httpHeaders.headers.set('Authorization', `Bearer ${token}`);
		return this.http.delete<LocationById>(url, httpHeaders).pipe(catchError(this.handleError));
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
		return this.http.put<UpdateLocation>(url, data, httpHeaders).pipe(catchError(this.handleError));
	}

	// uploadPhoto(_id: string, file: any, fileName: any): Observable<any> {
	// 	let url = `${this.locationUrl}/${_id}/photo`;
	// 	let token = sessionStorage.getItem('token');
	// 	httpHeaders.headers = httpHeaders.headers.set('Authorization', `Bearer ${token}`);
	// 	const fd = new FormData();
	// 	fd.append('file', file, fileName);
	// 	return this.http.put<any>(url, fd, httpHeaders).pipe(catchError(this.handleError));

	// const url = `${this.locationUrl}/${_id}/photo`;
	// let token = sessionStorage.getItem('token');
	// const formData = new FormData()
	// formData.append('file', file);
	// httpHeadersPhoto.headers =  httpHeadersPhoto.headers.set('Authorization', `Bearer ${token}`)
	// return this.http.put<any>(url, file, httpHeadersPhoto).pipe(catchError(this.handleError));
	// }

	uploadPhoto(_id: string, formData: FormData): Observable<any> {
		let url = `${this.locationUrl}/${_id}/photo`;
		let token = sessionStorage.getItem('token');
		const httpHeadersPhoto = {
			headers: new HttpHeaders({
				Authorization: `Bearer ${token}`
			})
		};
		return this.http.put<UpdateLocation>(url, formData, httpHeadersPhoto).pipe(catchError(this.handleError));
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
		return this.http.post<UpdateLocation>(this.locationUrl, data, httpHeaders).pipe(catchError(this.handleError));
	}

	handleError(error: HttpErrorResponse) {
		return throwError(error);
	}
}
