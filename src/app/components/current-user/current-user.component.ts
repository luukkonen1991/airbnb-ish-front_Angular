import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { User } from '../../models/User';
import { LocationService } from 'src/app/services/location.service';
import { LocationById } from 'src/app/models/LocationById';
import { UpdateLocation } from '../../models/UpdateLocation';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { HttpParams } from '@angular/common/http';

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
	allUsersData: User;
	location: LocationById = undefined;
	newLocation: UpdateLocation = {
		title: '',
		description: '',
		address: '',
		costType: '',
		costAmount: null,
		animalTypes: [],
		services: [],
		phone: '',
		email: '',
		user: ''
	};

	constructor(
		private authService: AuthService,
		private locationService: LocationService,
		private dataService: DataService,
		private userService: UserService
	) {}

	ngOnInit() {
		this.authService.getMe().subscribe(
			user => {
				if (user.data.role === 'admin') {
					this.userService.getAllUsers(100000).subscribe(allUsers => {
						this.allUsersData = allUsers;
						console.log(this.allUsersData);
					});
				}
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
			},
			error => {
				if (error.error.success === false) {
					this.dataService.showNotification(error.error.error, false);
				}
			}
		);
	}

	ngAfterContentInit() {
		this.authService.getMe().subscribe(
			user => {
				this.userData = user;
			},
			error => {
				if (error.error.success === false) {
					this.dataService.showNotification(error.error.error, false);
				}
			}
		);
	}

	deleteProfile() {
		this.dataService.showNotification('Profile delete not ready!', true);
	}

	deleteHotel() {
		this.locationService.deleteLocation(this.location.data[0]._id).subscribe((this.location = undefined));
		this.dataService.showNotification('Hotel deleted successfully!', true);
	}

	editHotel() {
		this.locationService
			.updateLocation(this.location.data[0]._id, this.location.data[0], this.userData.data._id)
			.subscribe(location => {
				console.log(location.data.title + 'incoming location logg');
				this.location.data[0] = location.data;
				this.dataService.showNotification('Hotel edited successfully!', true);
			});
	}

	addHotel() {
		console.log(this.newLocation.animalTypes);
		console.log(this.newLocation.services);
		console.log(this.newLocation.costType);
		this.locationService.createLocation(this.newLocation, this.userData.data._id).subscribe();
		this.ngOnInit();
		this.dataService.showNotification('New hotel added succesfully!', true);
	}

	getCheckboxValueAnimalTypes(event: Event) {
		if ((<HTMLInputElement>event.target).checked === true) {
			this.newLocation.animalTypes.push((<HTMLInputElement>event.target).value);
		} else if ((<HTMLInputElement>event.target).checked === false) {
			this.newLocation.animalTypes.splice(+(<HTMLInputElement>event.target).value, 1);
		}
	}

	getCheckboxValueAnimalServices(event: Event) {
		if ((<HTMLInputElement>event.target).checked === true) {
			this.newLocation.services.push((<HTMLInputElement>event.target).value);
		} else if ((<HTMLInputElement>event.target).checked === false) {
			this.newLocation.services.splice(+(<HTMLInputElement>event.target).value, 1);
		}
	}
	getCostTypeValue(event: Event) {
		if ((<HTMLInputElement>event.target).checked === true) {
			this.newLocation.costType = (<HTMLInputElement>event.target).value;
		}
	}
}
