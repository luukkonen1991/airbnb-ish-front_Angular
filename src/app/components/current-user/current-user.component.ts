import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { User } from '../../models/User';

@Component({
	selector: 'app-current-user',
	templateUrl: './current-user.component.html',
	styleUrls: [
		'./current-user.component.css'
	]
})
export class CurrentUserComponent implements OnInit {
	// currentUser: User;
	userData: User;
	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.authService.getMe().subscribe(user => {
			this.userData = user;
		});
	}
}
