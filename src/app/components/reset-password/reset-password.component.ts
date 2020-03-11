import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: [
		'./reset-password.component.css'
	]
})
export class ResetPasswordComponent implements OnInit {
	resetPassword = {
		password: '',
		password2: ''
	};
	token: any;
	form: any;
	msg: any;
	failed: string;
	errorState: string = '';
	constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private dataService: DataService) {}

	ngOnInit() {
		// this.token = +this.route.snapshot.paramMap.get('token');
	}

	onSubmit() {
		if (this.resetPassword.password !== this.resetPassword.password2) {
			this.dataService.showNotification('Passwords are not the same!', false);
			// alert('Passwords are not the same');
		} else {
			const token = this.route.snapshot.paramMap.get('token');
			this.authService.resetPassword(token, this.resetPassword.password);
      		this.dataService.showNotification('Successfully reseted password and logged in!', true);
			this.router.navigate([
				''
			]);
		}
	}
}
