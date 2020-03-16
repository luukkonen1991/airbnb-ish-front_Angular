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
		animalTypes: [],
		services: [],
		page: 1
	};

	@Output() locationsEvent = new EventEmitter<Location[]>();

	constructor(private dataService: DataService, private locationService: LocationService) {}

	ngOnInit() {
		console.log(this.params);

		// this.dataService.currentLocations.subscribe((locations) => (this.locations = locations));
	}

	onSubmit() {
		this.getCheckboxValueAnimalTypes(event);
		this.getCheckboxValueAnimalServices(event);
		this.dataService.changeParams(this.params);
		console.log(this.params.animalTypes + ' Log of this.params');
		console.log(this.params.page);
		this.locationService
			.getLocationsWithParams(
				this.params.minPrice || 1,
				this.params.maxPrice || 1000000,
				this.params.sortInput || '',
				this.params.animalTypes || [],
				this.params.services || [],
				this.params.page || 1
			)
			.subscribe(locationArray => {
				this.locations = locationArray.data;
				this.locationsEvent.emit(this.locations);
				console.log(this.locations);
				console.log(this.params.page);
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
			(this.params.animalTypes = undefined);
		this.params.services = undefined;
	}

	formState() {
		this.formShow = !this.formShow;
		console.log(this.formShow);
		console.log('clicked');
	}

	getCheckboxValueAnimalTypes(event: Event) {
		console.log(event);
		if ((<HTMLInputElement>event.target).checked === true) {
			this.params.animalTypes.push((<HTMLInputElement>event.target).value);
		} else if ((<HTMLInputElement>event.target).checked === false) {
			this.params.animalTypes.splice((<HTMLInputElement>event.target).value, 1);
		}
	}

	getCheckboxValueAnimalServices(event: Event) {
		console.log(event);
		if ((<HTMLInputElement>event.target).checked === true) {
			this.params.services.push((<HTMLInputElement>event.target).value);
		} else if ((<HTMLInputElement>event.target).checked === false) {
			this.params.services.splice((<HTMLInputElement>event.target).value, 1);
		}
	}
}
