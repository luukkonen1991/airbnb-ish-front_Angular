import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: [
		'./forgot-password.component.css'
	]
})
export class ForgotPasswordComponent implements OnInit {
	resetPassword = {
		email: ''
	};

	form: any;
	msg: any;
	failed: string;
	errorState: string = '';

	constructor(private router: Router, private authService: AuthService, private dataService: DataService) {}

	ngOnInit() {}

	onSubmit() {
		this.authService.forgotPassword(this.resetPassword.email).subscribe(msg => {
			if (msg.success === true) {
				this.msg = msg;
				this.dataService.showNotification(this.msg.data);
				// alert(this.msg.data);
				this.router.navigate([
					''
				]);
			}
		});
	}
}
