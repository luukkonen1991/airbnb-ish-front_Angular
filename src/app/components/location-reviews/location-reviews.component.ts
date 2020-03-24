import { Component, OnInit, Input } from '@angular/core';

import { Review } from '../../models/Review';

@Component({
	selector: 'app-location-reviews',
	templateUrl: './location-reviews.component.html',
	styleUrls: [
		'./location-reviews.component.css'
	]
})
export class LocationReviewsComponent implements OnInit {
	@Input() reviews: Review[];

	constructor() {}

	ngOnInit() {
		console.log(this.reviews, 'this.reviews');
	}
}
