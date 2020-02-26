import { Component, OnInit, Input } from '@angular/core';

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

	@Input() fromHome: Location[];

	constructor(private locationService: LocationService, private dataService: DataService) {}

	ngOnInit() {
		this.locationService.getLocations().subscribe((locationArray) => {
			this.locations = locationArray.data;
		});
	}

	ngDoCheck() {
		if (this.fromHome === undefined) {
			console.log('No search data');
		} else {
			this.locations = this.fromHome;
		}
	}
}
