import { Component, OnInit } from '@angular/core';
import { Review } from '../../models/Review';

@Component({
	selector: 'app-reviews-modal',
	templateUrl: './reviews-modal.component.html',
	styleUrls: [
		'./reviews-modal.component.css'
	]
})
export class ReviewsModalComponent implements OnInit {
	reviews: Review[];
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
