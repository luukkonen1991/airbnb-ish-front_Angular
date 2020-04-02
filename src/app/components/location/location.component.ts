import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location.service';

import { LocationById } from '../../models/LocationById';
import { Reviews } from '../../models/Reviews';

import { DataService } from 'src/app/services/data.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
	selector: 'app-location',
	templateUrl: './location.component.html',
	styleUrls: [
		'./location.component.css'
	]
})
export class LocationComponent implements OnInit {
	reviews: Reviews['data'];
	location: LocationById;
	_id: string;
	showMe: boolean;
	showReviews: boolean;
	toggleReviewsBtn: boolean;
	latitude: number;
	lngitude: number;

	params: any = {
		minPrice: null,
		maxPrice: null,
		sortInput: '',
		animalTypes: [],
		services: []
	};

	constructor(
		private route: ActivatedRoute,
		private locationService: LocationService,
		private reviewService: ReviewService,
		private dataService: DataService
	) {
		this.showReviews = false;
		this.toggleReviewsBtn = false;
	}

	ngOnInit() {
		this.dataService.currentId.subscribe(_id => {
			if (_id !== undefined) {
				this._id = _id;
				this.idToSessionStorage(_id);
			} else if (_id === undefined) {
				this._id = sessionStorage.getItem('id');
			}
		});
		console.log(this._id);
		this.locationService.getLocation(this._id).subscribe(
			location => (
				(this.location = location),
				this.reviewService.getLocationReviews(this._id).subscribe(
					reviews => {
						console.log(reviews + 'REviewsLOGGG');
						this.reviews = reviews.data;
						if (this.reviews.length !== 0) {
							this.toggleReviewsBtn = true;
						}
						console.log(this.reviews);
					},
					error => {
						console.log(error);
					}
				)
			)
		);

		//check if signed in
		let token = sessionStorage.getItem('token');
		if (token) {
			this.showMe = true;
		}
	}

	backToLocations() {
		this.dataService.changeParams(this.params);
	}
	showReviewsToggle() {
		this.showReviews = !this.showReviews;
	}

	addReviewToggle() {}

	idToSessionStorage(_id: string) {
		sessionStorage.setItem('id', _id);
	}
}
