import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/Review';
import { ReviewService } from 'src/app/services/review.service';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-create-review-modal',
	templateUrl: './create-review-modal.component.html',
	styleUrls: [
		'./create-review-modal.component.css'
	]
})
export class CreateReviewModalComponent implements OnInit {
	locationId: string;
	newReview: Review = {
		title: '',
		text: '',
		rating: null
	};
	constructor(private reviewService: ReviewService, private dataService: DataService) {
		this.locationId = sessionStorage.getItem('id');
	}

	ngOnInit() {}

	getReviewRating(event: Event) {
		if ((<HTMLInputElement>event.target).checked === true) {
			this.newReview.rating = parseInt((<HTMLInputElement>event.target).value);
		}
	}

	addReview() {
		this.reviewService.createLocationReview(this.locationId, this.newReview).subscribe(
			res => {
				if (res.success === true) {
					this.ngOnInit();
					this.dataService.showNotification('New hotel added succesfully!', true);
				}
			},
			error => {
				if (error.error.success === false) {
					console.log(error.error.error);
					this.dataService.showNotification(error.error.error, false);
				}
			}
		);
	}
}
