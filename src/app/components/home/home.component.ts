import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/Location';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [
		'./home.component.css'
	]
})
export class HomeComponent implements OnInit {
	constructor() {}

	locations: Location[];

	newLocations($event: Location[]) {
		this.locations = $event;
	}

	ngOnInit() {}

	ngDoCheck() {
		console.log(this.locations + 'homeCOMPONENTTITII');
	}
}
