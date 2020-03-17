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
		console.log('ONINIT');
		this.locationService.getLocations().subscribe(locationArray => {
			console.log(locationArray.pagination),
				console.log(locationArray),
				(this.locations = locationArray.data),
				(this.pagination = locationArray.pagination);
		});

		this.dataService.currentId.subscribe(_id => (this._id = _id));
		this.dataService.currentParams.subscribe(params => {
			this.params = params;
		});
	}

	// ngAfterContentInit() {
	// 	this.locationService.getPaginationData().subscribe(pagination => {
	// 		console.log(pagination), (this.pagination = pagination);
	// 		console.log(this.pagination.pagination.next.page + 'logged this.pagination');
	// 		console.log(this.pagination.pagination.prev + 'logged this.pagination');
	// 	});
	// }

	ngDoCheck() {
		if (this.fromHome === undefined) {
			return;
		} else {
			// console.log(this.fromHome + 'FromHOME');
			// console.log(this.params);
			this.pageNumber = this.params.page;
			this.locations = this.fromHome;
			if (this.fromHome.length >= 4) {
				this.locationService.getLocations().subscribe(locationArray => {
					this.pagination = locationArray.pagination;
				});
			} else {
				this.pagination = {};
			}
			this.fromHome = undefined;
		}
	}

	passLocationId(_id: string) {
		this.dataService.changeLocationId(_id);
	}

	changePageNext(e: any) {
		console.log(this.pagination + 'Logged pagination on next');
		console.log(this.pagination.next.page);
		console.log(e);
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
			console.log(this.pageNumber);
			this.pageNumber++;
			console.log(this.pageNumber);
		}
	}
	changePagePrev(e: any) {
		console.log(this.pagination + 'Logged pagination on prev');
		console.log(this.pagination.prev.page);
		console.log(e);
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
		}
	}
}
