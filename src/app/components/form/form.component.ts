import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LocationService } from '../../services/location.service';
import { DataService } from '../../services/data.service';

import { Location } from '../../models/Location';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: [
		'./form.component.css'
	]
})
export class FormComponent implements OnInit {
	locations: Location[];
	radioStatus: boolean = false;

	params: any = {
		minPrice: null,
		maxPrice: null,
		sortInput: '',
		animalTypeDog: '',
		animalTypes: []
	};

	@Output() locationsEvent = new EventEmitter<Location[]>();

	constructor(private dataService: DataService, private locationService: LocationService) {}

	ngOnInit() {
		this.dataService.currentParams.subscribe((params) => (this.params = params));

		// this.dataService.currentLocations.subscribe((locations) => (this.locations = locations));
	}

	onSubmit() {
		this.locationService
			.getLocationsWithParams(this.params.minPrice || 1, this.params.maxPrice || 999, this.params.sortInput || '')
			.subscribe((locationArray) => {
				this.locations = locationArray.data;
				this.locationsEvent.emit(this.locations);
				console.log(this.locations);
			});
		// this.dataService.changeLocations(this.locations);
		// this.dataService.changeLocations({
		// 	locations = this.locations
		// });
		// this.dataService.changeParams({
		// 	minPrice: this.params.minPrice,
		// 	maxPrice: this.params.maxPrice
		// });

		// this.clearState();
	}

	clearState() {
		(this.params.minPrice = null), (this.params.maxPrice = null), (this.params.sortInput = '');
	}

	getCheckboxValue(event: Event) {
		let val = (<HTMLInputElement>event.target).value;
		console.log(typeof val);
		console.log(val);
		this.params.animalTypes.push(val);
		console.log(this.params.animalTypes);
	}
}
