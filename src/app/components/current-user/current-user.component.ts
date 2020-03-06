import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { User } from '../../models/User';
import { LocationService } from 'src/app/services/location.service';
import { LocationById } from 'src/app/models/LocationById';

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
	location: LocationById;
	constructor(private authService: AuthService, private locationService: LocationService) {}

	ngOnInit() {
		this.authService.getMe().subscribe(user => {
			this.locationService.getOwnedLocation(user.data._id).subscribe(location => {
				this.location = location;
				console.log(this.location);
			});
		});
	}

	ngAfterContentInit() {
		this.authService.getMe().subscribe(user => {
			this.userData = user;
			console.log(this.userData);
		});
	}
}
