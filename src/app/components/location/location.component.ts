import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location.service';

import { LocationById } from '../../models/LocationById';
import { Reviews } from '../../models/Reviews';
import { Review } from '../../models/Review';

import { DataService } from 'src/app/services/data.service';
import { ReviewService } from 'src/app/services/review.service';
import { ViewportScroller } from '@angular/common';

@Component({
	selector: 'app-location',
	templateUrl: './location.component.html',
	styleUrls: [
		'./location.component.css'
	]
})
export class LocationComponent implements OnInit {
	newReviewData: Review;
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
		private dataService: DataService,
		private viewPortScroller: ViewportScroller
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

	receiveReviewInput($event) {
		this.newReviewData = $event;
		this.reviewService.createLocationReview(this._id, this.newReviewData).subscribe(
			res => {
				if (res.success === true) {
					this.viewPortScroller.scrollToPosition([
						0,
						0
					]);
					this.ngOnInit();
					this.dataService.showNotification('New review added succesfully!', true);
				}
			},
			error => {
				if (error.error.success === false) {
					this.viewPortScroller.scrollToPosition([
						0,
						0
					]);
					this.dataService.showNotification('User can add only one review per PetHotel', false);
				}
			}
		);
	}
}
