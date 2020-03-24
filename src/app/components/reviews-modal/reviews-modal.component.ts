import { Component, OnInit } from '@angular/core';
import { Reviews } from '../../models/Reviews';
import { Review } from 'src/app/models/Review';

@Component({
	selector: 'app-reviews-modal',
	templateUrl: './reviews-modal.component.html',
	styleUrls: [
		'./reviews-modal.component.css'
	]
})
export class ReviewsModalComponent implements OnInit {
	reviews: Reviews;
	review: Review;

	constructor() {
		this.review.title = '';
		this.review.text = '';
		this.review.rating = null;
	}

	ngOnInit() {}

	getRating(event: HTMLInputElement) {}
	addReview() {}
}
