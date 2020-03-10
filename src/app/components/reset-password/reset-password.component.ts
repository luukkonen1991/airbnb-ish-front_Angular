import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: [
		'./reset-password.component.css'
	]
})
export class ResetPasswordComponent implements OnInit {
	resetPassword = {
		secret: '',
		password: ''
	};
	form: any;
	msg: any;
	failed: string;
	errorState: string = '';
	constructor(private router: Router, private authService: AuthService) {}

	ngOnInit() {}

	onSubmit() {
		this.authService.resetPassword(this.resetPassword.secret, this.resetPassword.password).subscribe(msg => {
			if (msg.success === true) {
				this.router.navigate([
					''
				]);
			}
		});
	}
}
