import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LocationService } from '../../services/location.service';
import { DataService } from '../../services/data.service';

import { Locations } from '../../models/Locations';
import { Location } from '../../models/Location';
// import { Pagination } from '../../models/Pagination';

@Component({
	selector: 'app-locations',
	templateUrl: './locations.component.html',
	styleUrls: [
		'./locations.component.css'
	]
})
export class LocationsComponent implements OnInit {
	pageNumber: number = 1;
	tempLocations: Location[];
	locations: Locations['data'];
	pagination: Locations['pagination'] = {
		next: null,
		prev: null
	};
	params: any = {
		minPrice: null,
		maxPrice: null,
		sortInput: '',
		animalTypes: [],
		services: []
	};
	_id: string;

	@Input() fromHome: Location[];

	constructor(private locationService: LocationService, private dataService: DataService, private router: Router) {}

	ngOnInit() {
		this.dataService.currentParams.subscribe(params => {
			this.params = params;
		});
		this.dataService.currentPage.subscribe(page => {
			console.log(page, ' page onONinit');
			this.pageNumber = page || 1;
			this.params.page = page;
		});
		console.log('ONINIT');
		// this.locationService.getLocations().subscribe(locationArray => {
		// 	console.log(locationArray.pagination),
		// 		console.log(locationArray),
		// 		(this.locations = locationArray.data),
		// 		(this.pagination = locationArray.pagination);
		// });
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
				(this.locations = locationArray.data), (this.pagination = locationArray.pagination);
			});

		this.dataService.currentId.subscribe(_id => (this._id = _id));
	}

	ngDoCheck() {
		if (this.fromHome === undefined) {
			return;
		} else {
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
					this.pagination = locationArray.pagination;
				});
			this.pageNumber = this.params.page;
			this.locations = this.fromHome;
			this.dataService.changeParams(this.params);
			this.dataService.changePage(this.pageNumber);
			console.log(this.params);
			console.log(this.pageNumber);
			console.log('ngDoCheckRan!!!');
			// console.log(this.pageNumber);
			this.fromHome = undefined;
		}
	}

	ngAfterViewInit() {
		console.log(this.params, 'NgAfterViewInit');
		console.log(this.pageNumber, 'NgAfterViewInit');
	}

	passLocationId(_id: string) {
		this.dataService.changeLocationId(_id);
	}

	changePageNext(e: any) {
		// console.log(this.params);
		// console.log(this.pagination + 'Logged pagination on next');
		// console.log(this.pagination.next.page);
		// console.log(e);
		if (e === 'next' && this.pagination.next !== undefined) {
			console.log(this.pagination.next.page + 'Is there next page before getLOCATIONSWITHPARAMS');
			this.locationService
				.getLocationsWithParams(
					this.params.minPrice || 1,
					this.params.maxPrice || 1000000,
					this.params.sortInput || '',
					this.params.animalTypes || [],
					this.params.services || [],
					this.pagination.next.page
				)
				.subscribe(locationArray => {
					(this.locations = locationArray.data),
						(this.pagination = locationArray.pagination),
						console.log(this.pagination);
				});
			// console.log(this.pageNumber);
			this.pageNumber++;
			this.dataService.changePage(this.pageNumber);
			// console.log(this.pageNumber);
		}
	}
	changePagePrev(e: any) {
		// console.log(this.pagination + 'Logged pagination on prev');
		// console.log(this.pagination.prev.page);
		// console.log(e);
		if (e === 'prev' && this.pagination.prev !== undefined) {
			console.log(this.pagination.prev.page + 'Is there prev page before getLOCATIONSWITHPARAMS');
			this.locationService
				.getLocationsWithParams(
					this.params.minPrice || 1,
					this.params.maxPrice || 1000000,
					this.params.sortInput || '',
					this.params.animalTypes || [],
					this.pagination.prev.page
				)
				.subscribe(locationArray => {
					(this.locations = locationArray.data),
						(this.pagination = locationArray.pagination),
						console.log(this.pagination);
				});
			this.pageNumber--;
			this.dataService.changePage(this.pageNumber);
		}
	}
}
