import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [
		'./navbar.component.css'
	]
})
export class NavbarComponent implements OnInit {
	constructor() {}

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
}
