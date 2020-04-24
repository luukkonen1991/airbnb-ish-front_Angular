import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

import { AuthRegister } from '../../models/AuthRegister';

@Component({
	selector: 'app-become-host',
	templateUrl: './become-host.component.html',
	styleUrls: [
		'./become-host.component.css'
	]
})
export class BecomeHostComponent implements OnInit {
	authRegister: AuthRegister = {
		name: '',
		email: '',
		password: '',
		role: 'publisher'
	};
	form: any;
	errorState: string = '';

	constructor(private authService: AuthService, private router: Router, private dataService: DataService) {}

	ngOnInit() {}

	onSubmit($event: any) {
		this.authService.registerUser(this.authRegister).subscribe(
			res => {
				if (res.success === true) {
					sessionStorage.setItem('token', res.token);
					this.dataService.showNotification('Successfully logged in!', true);
					this.router.navigate([
						'/me'
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
