import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';

import { Location } from '../../models/Location';

@Component({
	selector: 'app-locations',
	templateUrl: './locations.component.html',
	styleUrls: [
		'./locations.component.css'
	]
})
export class LocationsComponent implements OnInit {
	locations: Location;

	constructor(private locationService: LocationService) {}

	ngOnInit() {
		this.locationService.getLocations().subscribe((locations) => {
			this.locations = locations;
			console.log(locations);
		});
	}
}
