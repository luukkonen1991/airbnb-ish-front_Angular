import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Review } from 'src/app/models/Review';
import { Reviews } from 'src/app/models/Reviews';
import { ReviewService } from 'src/app/services/review.service';
import { DataService } from 'src/app/services/data.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-edit-review-modal',
  templateUrl: './edit-review-modal.component.html',
  styleUrls: [
    './edit-review-modal.component.css'
  ]
})
export class EditReviewModalComponent implements OnInit {
  @Input() infoData: Review;
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
  constructor( ) {  }

  ngOnInit() { }

  ngOnChanges() {
    this.newReview._id = this.infoData._id;
    this.newReview.title = this.infoData.title;
    this.newReview.text = this.infoData.text;
    this.newReview.rating = this.infoData.rating;
   }

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
