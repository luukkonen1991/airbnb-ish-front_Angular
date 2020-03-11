import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
		// secret: '',
		password: ''
	};
	token: any;
	form: any;
	msg: any;
	failed: string;
	errorState: string = '';
	constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

	ngOnInit() {
		// this.token = +this.route.snapshot.paramMap.get('token');
	}

	onSubmit() {
		const token = this.route.snapshot.paramMap.get('token');
		console.log(token);
		this.authService.resetPassword(token, this.resetPassword.password).subscribe(msg => {
			if (msg.success === true) {
				this.router.navigate([
					''
				]);
			}
		});
	}
}
