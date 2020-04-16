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
  used: boolean = false;
  newReview: Review = {
    title: '',
    text: '',
    rating: null
  };
  ratingValidation: number = null;
  form: any;
  msg: any;
  errorState: string = '';
  constructor() { }

  ngOnInit() {
    this.ratingValidation = this.infoData.rating;
    this.newReview._id = this.infoData._id;
    this.newReview.title = this.infoData.title;
    this.newReview.text = this.infoData.text;
    // this.newReview.rating = this.infoData.rating;
  }

  ngDoCheck() {
    if (this.used === false) {
      this.checkOldValues();
    }
  }

  ngOnChanges() {
    this.checkOldValues();
  }

  checkOldValues() {
    for (let i = 0; i <= 5; i++) {
      if (this.infoData.rating === i) {
        const paska = document.getElementById(`${i}`) as HTMLInputElement
        paska.checked = true;
      }
    }
  }


  getReviewRating(event: Event) {
    this.used = true;
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
