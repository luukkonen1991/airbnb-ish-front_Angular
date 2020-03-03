import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LocationService } from '../../services/location.service';
import { DataService } from '../../services/data.service';

import { Location } from '../../models/Location';

@Component({
	selector: 'app-locations',
	templateUrl: './locations.component.html',
	styleUrls: [
		'./locations.component.css'
	]
})
export class LocationsComponent implements OnInit {
	tempLocations: Location[];
	locations: Location[];
	params: any;
	_id: string;

	@Input() fromHome: Location[];

	constructor(private locationService: LocationService, private dataService: DataService, private router: Router) {}

	ngOnInit() {
		this.locationService.getLocations().subscribe(locationArray => {
			this.locations = locationArray.data;
		});

		this.dataService.currentId.subscribe(_id => (this._id = _id));
	}

	ngDoCheck() {
		if (this.fromHome === undefined) {
			return;
		} else {
			this.locations = this.fromHome;
		}
	}

	passLocationId(_id: string) {
		this.dataService.changeLocationId(_id);
	}
}
