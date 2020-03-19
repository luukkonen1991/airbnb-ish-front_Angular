import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { User } from '../../models/User';
import { LocationService } from 'src/app/services/location.service';
import { LocationById } from 'src/app/models/LocationById';
import { UpdateLocation } from '../../models/UpdateLocation';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { HttpParams } from '@angular/common/http';
import { ContactService } from 'src/app/services/contact.service';
import { ContactMessage } from 'src/app/models/ContactMessage';

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
	allMessagesData: ContactMessage;
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
		private userService: UserService,
		private contactService: ContactService
	) { }

	ngOnInit() {
		this.authService.getMe().subscribe(
			user => {
				if (user.data.role === 'admin') {
					this.userService.getAllUsers(100000).subscribe(allUsers => {
						this.allUsersData = allUsers
						console.log(this.allUsersData)
					})
					this.contactService.getAllMessages(100000).subscribe(allMessages => {
						this.allMessagesData = allMessages
						console.log(this.allMessagesData)
					})
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

	//usercommands
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
		this.locationService.createLocation(this.newLocation, this.userData.data._id).subscribe();
		this.ngOnInit();
		this.dataService.showNotification('New hotel added succesfully!', true);
	}


	//admincommands
	deleteUser(deleteId) {
		console.log(deleteId);
		this.userService.deleteUser(deleteId).subscribe();
		this.userService.getAllUsers(100000).subscribe(allUsers => {
			this.allUsersData = allUsers
			console.log(this.allUsersData)
		})
		this.dataService.showNotification('User deleted successfully!', true);
	}

	deleteMessage(deleteId) {
		console.log(deleteId);
		this.contactService.deleteMessage(deleteId).subscribe();
		this.contactService.getAllMessages(100000).subscribe(allMessages => {
			this.allMessagesData = allMessages
			console.log(this.allMessagesData)
		});
		this.dataService.showNotification('Message deleted successfully!', true);
	}

	passDeleteMessageData(id, msg) {
		console.log(id);
		document.getElementById('deleteMessageModalLabel').innerHTML = 'Are you sure you want to delete message: "<b>' + msg + '"</b>?';
		document.getElementById('deleteMessageId').addEventListener("click", () => this.deleteMessage(id));
	}

	passDeleteUserData(id, name) {
		console.log(id);
		document.getElementById('deleteUserModalLabel').innerHTML = 'Are you sure you want to delete user: "<b>' + name + '"</b>?';
		document.getElementById('deleteUserId').addEventListener("click", () => this.deleteUser(id));
	}
}
