import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-signup-login',
	templateUrl: './signup-login.component.html',
	styleUrls: [
		'./signup-login.component.css'
	]
})
export class SignupLoginComponent implements OnInit {
	formShow: boolean = false;

	params: any = {
		name: '',
		email: '',
		password: ''
	};

	constructor() {}

	ngOnInit() {}

	formState() {
		this.formShow = !this.formShow;
		console.log(this.formShow);
		console.log('clicked');
	}
}
