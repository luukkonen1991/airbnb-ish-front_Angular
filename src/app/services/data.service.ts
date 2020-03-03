import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Location } from '../models/Location';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	locations: Location[];
	_id: string;

	private searchParams = new BehaviorSubject({});
	currentParams = this.searchParams.asObservable();

	private newLocations = new BehaviorSubject(this.locations);
	currentLocations = this.newLocations.asObservable();

	private locationId = new BehaviorSubject(this._id);
	currentId = this.locationId.asObservable();

	constructor() {}

	changeParams(params: any) {
		this.searchParams.next(params);
	}

	changeLocations(locations: Location[]) {
		this.newLocations.next(locations);
	}

	changeLocationId(_id: string) {
		this.locationId.next(_id);
	}
}
