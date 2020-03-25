import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-star-rating',
	templateUrl: './star-rating.component.html',
	styleUrls: [
		'./star-rating.component.css'
	]
})
export class StarRatingComponent implements OnInit {
	@Input() rating: number;
	iconClass = {
		0: 'fa fa-star-o',
		0.5: 'fa fa-star-half-o',
		1: 'fa fa-star'
	};

	stars: number[] = [
		0,
		0,
		0,
		0,
		0
	];
	constructor() {}

	ngOnChanges() {
		this.fillStars();
	}

	ngOnInit() {
		console.log(this.rating);
	}

	fillStars() {
		let starsToFill = Math.round(this.rating * 2) / 2; //round to nearest 0.5
		let i = 0;
		while (starsToFill > 0.5) {
			this.stars[i] = 1;
			i++;
			starsToFill--;
		}
		if (starsToFill === 0.5) {
			this.stars[i] = 0.5;
		}
	}
}
