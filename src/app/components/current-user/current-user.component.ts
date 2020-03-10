import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { User } from '../../models/User';
import { LocationService } from 'src/app/services/location.service';
import { LocationById } from 'src/app/models/LocationById';
import { UpdateLocation } from '../../models/UpdateLocation';

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
	location: LocationById = undefined;
	newLocation: UpdateLocation = {
		title: '',
		description: '',
		address: '',
		costType: '',
		costAmount: null,
		animalTypes: [],
		services: [],
		user: ''
	};

	constructor(private authService: AuthService, private locationService: LocationService) { }

	ngOnInit() {
		console.log(1);
		this.authService.getMe().subscribe(user => {
			if (user.data.role !== 'publisher') {
				return;
			}
			this.locationService.getOwnedLocation(user.data._id, user.data.createdAt).subscribe(location => {
				if (location.count === 0) {
					return;
				}
				this.location = location;
				console.log(this.location);
			});
		});
	}

	ngAfterContentInit() {
		console.log(2);
		this.authService.getMe().subscribe(user => {
			this.userData = user;
			console.log(this.userData);
		});
	}

	// ngAfterViewInit() {
	// 	console.log(3);
	// }

	deleteProfile() {
		console.log('Profile delete xD');
	}

	deleteHotel() {
		this.locationService.deleteLocation(this.location.data[0]._id).subscribe((this.location = undefined));
	}

	editHotel() {
		this.locationService
			.updateLocation(this.location.data[0]._id, this.location.data[0], this.userData.data._id)
			.subscribe(location => {
				console.log(location.data.title + 'incoming location logg');
				this.location.data[0] = location.data;
			});
	}

	addHotel() {
		this.locationService
			.createLocation(this.newLocation, this.userData.data._id)
			.subscribe(location => {
				this.location.data = location;
			});
	}
}
