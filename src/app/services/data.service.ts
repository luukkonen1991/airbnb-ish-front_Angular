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
	page: number;

	private searchPage = new BehaviorSubject(this.page);
	currentPage = this.searchPage.asObservable();

	private searchParams = new BehaviorSubject({});
	currentParams = this.searchParams.asObservable();

	private newLocations = new BehaviorSubject(this.locations);
	currentLocations = this.newLocations.asObservable();

	private locationId = new BehaviorSubject(this._id);
	currentId = this.locationId.asObservable();

	private loginResponse = new BehaviorSubject(this.msg);
	currentResponse = this.loginResponse.asObservable();

	constructor() {}

	changePage(page: number) {
		this.searchPage.next(page);
	}

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

	showNotification(text: string, success: boolean) {
		if (document.getElementById('showNotificationBox')) {
			if (success === true) {
				document.getElementById('showNotificationBox').setAttribute('class', 'alert alert-success text-center');
				document.getElementById('showNotificationBox').setAttribute('id', 'hideNotificationBox');
				document.getElementById('hideNotificationBox').innerText = text;
			}
			if (success === false) {
				document.getElementById('showNotificationBox').setAttribute('class', 'alert alert-danger text-center');
				document.getElementById('showNotificationBox').setAttribute('id', 'hideNotificationBox');
				document.getElementById('hideNotificationBox').innerText = text;
			}
			setTimeout(function() {
				document.getElementById('hideNotificationBox').setAttribute('id', 'showNotificationBox');
			}, 2500);
		}
	}
}
