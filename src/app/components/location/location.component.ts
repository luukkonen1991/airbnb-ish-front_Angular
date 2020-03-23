import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location.service';

import { LocationById } from '../../models/LocationById';

import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-location',
	templateUrl: './location.component.html',
	styleUrls: [
		'./location.component.css'
	]
})
export class LocationComponent implements OnInit {
	location: LocationById;
	_id: string;
	showMe: boolean;
	latitude: number;
	lngitude: number;

	params: any = {
		minPrice: null,
		maxPrice: null,
		sortInput: '',
		animalTypes: [],
		services: []
	};

	constructor(
		private route: ActivatedRoute,
		private locationService: LocationService,
		private dataService: DataService
	) {}

	ngOnInit() {
		this.dataService.currentId.subscribe(_id => (this._id = _id));

		// const _id = this.route.snapshot.paramMap.get('_id');
		// const _id = this.route.params;
		// console.log(_id);
		// console.log(window.history.state);
		// console.log(_id);
		this.locationService.getLocation(this._id).subscribe(location => (this.location = location, console.log(this.location)));

		//check if signed in
		let token = sessionStorage.getItem('token');
		if (token) {
			this.showMe = true;
		}
	}

	backToLocations() {
		this.dataService.changeParams(this.params);
	}
}
