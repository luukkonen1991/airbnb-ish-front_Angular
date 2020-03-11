import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

import { AuthRegister } from '../../models/AuthRegister';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [
		'./register.component.css'
	]
})
export class RegisterComponent implements OnInit {
	authRegister: AuthRegister = {
		name: '',
		email: '',
		password: ''
	};

	form: any;
	msg: any;
	errorState: string = '';

	constructor(private authService: AuthService, private router: Router, private dataService: DataService) {}

	ngOnInit() {}

	onSubmit() {
		this.authService.registerUser(this.authRegister);
		this.dataService.currentResponse.subscribe(msg => (this.msg = msg));
	}

	ngDoCheck() {
		if (this.msg === true) {
			this.dataService.showNotification('Successfully registered and logged in!');
			this.router.navigate([
				''
			]);
		}
		if (this.msg === 'Unauthorized') {
			this.errorState = 'Invalid Credentials';
		}
	}
}
