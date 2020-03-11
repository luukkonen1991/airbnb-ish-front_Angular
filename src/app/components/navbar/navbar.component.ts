import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [
		'./navbar.component.css'
	]
})
export class NavbarComponent implements OnInit {
	showMe: boolean;

	constructor(private cookieService: CookieService, private dataService: DataService) {}

	ngOnInit() {}

	ngDoCheck() {
		// let token = this.cookieService.get('token');
		let token = sessionStorage.getItem('token');
		if (token) {
			this.showMe = true;
		}
	}

	logOut() {
		sessionStorage.clear();
		this.dataService.showNotification('Successfully logged out!');
		this.showMe = false;
	}

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
}
