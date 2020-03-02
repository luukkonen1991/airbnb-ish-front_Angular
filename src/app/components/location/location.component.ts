import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location.service';

import { LocationById } from '../../models/LocationById';

@Component({
	selector: 'app-location',
	templateUrl: './location.component.html',
	styleUrls: [
		'./location.component.css'
	]
})
export class LocationComponent implements OnInit {
	location: LocationById;

	constructor(private route: ActivatedRoute, private locationService: LocationService) {}

	ngOnInit() {
		const _id = this.route.snapshot.paramMap.get('_id');
		this.locationService.getLocation(_id).subscribe((location) => (this.location = location));
	}
}
