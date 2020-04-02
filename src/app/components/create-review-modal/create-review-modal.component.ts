import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/Review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
	selector: 'app-create-review-modal',
	templateUrl: './create-review-modal.component.html',
	styleUrls: [
		'./create-review-modal.component.css'
	]
})
export class CreateReviewModalComponent implements OnInit {
	newReview: Review = {
		title: '',
		text: '',
		rating: null
	};
	constructor(private reviewService: ReviewService) {}

	ngOnInit() {}

	getReviewRating(event: Event) {
		if ((<HTMLInputElement>event.target).checked === true) {
			this.newReview.rating = parseInt((<HTMLInputElement>event.target).value);
		}
	}

	addReview(newReview: Review) {}
}
