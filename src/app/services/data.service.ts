import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Location } from '../models/Location';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	locations: Location[];
	_id: string;
	msg: any;

	private searchParams = new BehaviorSubject({});
	currentParams = this.searchParams.asObservable();

	private newLocations = new BehaviorSubject(this.locations);
	currentLocations = this.newLocations.asObservable();

	private locationId = new BehaviorSubject(this._id);
	currentId = this.locationId.asObservable();

	private loginResponse = new BehaviorSubject(this.msg);
	currentResponse = this.loginResponse.asObservable();

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
	changeLoginResponse(msg: any) {
		this.loginResponse.next(msg);
	}

	showNotification(text: string) {
		if (document.getElementById('showNotificationBox')) {
			document.getElementById('showNotificationBox').setAttribute('id', 'hideNotificationBox')
			document.getElementById('hideNotificationBox').innerText = text
			setTimeout(function () {
				document.getElementById('hideNotificationBox').setAttribute('id', 'showNotificationBox');
			}, 2500);
		}
	}
}
