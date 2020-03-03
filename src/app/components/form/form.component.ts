import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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

	formShow: boolean = false;

	params: any = {
		minPrice: null,
		maxPrice: null,
		sortInput: '',
		animalType: undefined
	};

	@Output() locationsEvent = new EventEmitter<Location[]>();

	constructor(private dataService: DataService, private locationService: LocationService) {}

	ngOnInit() {
		this.dataService.currentParams.subscribe(params => (this.params = params));
		// this.dataService.currentLocations.subscribe((locations) => (this.locations = locations));
	}

	onSubmit() {
		this.locationService
			.getLocationsWithParams(
				this.params.minPrice || 1,
				this.params.maxPrice || 999,
				this.params.sortInput || '',
				this.params.animalType || undefined
			)
			.subscribe(locationArray => {
				this.locations = locationArray.data;
				this.locationsEvent.emit(this.locations);
				console.log(this.locations);
				console.log(this.params.animalType);
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
		(this.params.minPrice = null),
			(this.params.maxPrice = null),
			(this.params.sortInput = ''),
			(this.params.sortInput = ''),
			(this.params.animalType = undefined);
	}

	formState() {
		this.formShow = !this.formShow;
		console.log(this.formShow);
		console.log('clicked');
	}
}
