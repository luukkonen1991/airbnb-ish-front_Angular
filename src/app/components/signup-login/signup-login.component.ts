import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

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
		email: undefined,
		password: undefined
	};

	constructor(private authService: AuthService) {}

	ngOnInit() {}

	formState() {
		this.formShow = !this.formShow;
		console.log(this.formShow);
		console.log('clicked');
	}

	onSubmit() {
		this.authService.loginUser(this.params.email, this.params.password);
	}
}
