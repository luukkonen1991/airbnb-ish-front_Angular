import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [
		'./navbar.component.css'
	]
})
export class NavbarComponent implements OnInit {
	showMe: boolean;

	constructor(private cookieService: CookieService) {}

	ngOnInit() {}

	navState() {
		var element = document.getElementById('buttonCollapse');
		var element2 = document.getElementById('navigationCollapse');

		if (element.getAttribute('aria-expanded') === 'true') {
			element.setAttribute('aria-expanded', 'false');
			element.setAttribute('class', 'navbar-toggler');
		}

		if (element2.className === 'navbar-collapse justify-content-end collapse show') {
			element2.setAttribute('class', 'navbar-collapse justify-content-end collapse');
		}
	}

	ngDoCheck() {
		let token = this.cookieService.get('token');
		if (token) {
			this.showMe = true;
		}
	}
}
