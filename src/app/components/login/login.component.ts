import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
// import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { AuthLogin } from '../../models/AuthLogin';
import { DataService } from 'src/app/services/data.service';
import { throwError } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [
		'./login.component.css'
	]
})
export class LoginComponent implements OnInit {
	authLogin: AuthLogin = {
		email: '',
		password: ''
	};
	form: any;
	msg: any;
	errorState: string = '';
	// showExtended: boolean = true;
	// loaded: boolean = false;
	// enableAdd: boolean = false;
	// showUserForm: boolean = false;

	constructor(
		private authService: AuthService,
		// private cookieService: CookieService,
		private router: Router,
		private dataService: DataService
	) {}

	ngOnInit() {}

	onSubmit($event: any) {
		this.authService.loginUser(this.authLogin.email, this.authLogin.password).subscribe(
			res => {
				if (res.success === true) {
					sessionStorage.setItem('token', res.token);
					this.dataService.showNotification('Successfully logged in!', true);
					this.router.navigate([
						''
					]);
				}
			},
			error => {
				if (error.error.success === false) {
					this.dataService.showNotification(error.error.error, false);
					this.errorState = error.error.error;
				}
			}
		);
	}
}

// if (!valid) {
// 	console.log('Form is not valid');
// } else {
// 	// value.isActive = true;
// 	// value.registered = new Date();
// 	// value.hide = true;
// 	// this.userService.addUser(value);
// 	this.form.reset();
// }
