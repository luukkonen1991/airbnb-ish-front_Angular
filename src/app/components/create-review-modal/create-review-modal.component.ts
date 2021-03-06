import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Review } from 'src/app/models/Review';
import { ReviewService } from 'src/app/services/review.service';
import { DataService } from 'src/app/services/data.service';
import { ViewportScroller } from '@angular/common';

@Component({
	selector: 'app-create-review-modal',
	templateUrl: './create-review-modal.component.html',
	styleUrls: [
		'./create-review-modal.component.css'
	]
})
export class CreateReviewModalComponent implements OnInit {
	@Output() addReviewInput = new EventEmitter<Review>();
	locationId: string;
	newReview: Review = {
		title: '',
		text: '',
		rating: null
	};
	ratingValidation: number = null;
	form: any;
	msg: any;
	errorState: string = '';
	constructor(
		private reviewService: ReviewService,
		private dataService: DataService,
		private viewPortScroller: ViewportScroller
	) {
		this.locationId = sessionStorage.getItem('id');
	}

	ngOnInit() {}

	getReviewRating(event: Event) {
		if ((<HTMLInputElement>event.target).checked === true) {
			this.newReview.rating = parseInt((<HTMLInputElement>event.target).value);
		}
	}

	addReview() {
		this.getReviewRating(event);
		this.addReviewInput.emit(this.newReview);
	}

	resetValues() {
		this.newReview.title = '';
		this.newReview.text = '';
		this.newReview.rating = null;
	}
}
