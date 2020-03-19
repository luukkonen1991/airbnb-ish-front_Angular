import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
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
	@ViewChildren('inputsNew') public inputsNew: ElementRef<HTMLInputElement>[];
	@ViewChildren('inputsEdit') public inputsEdit: ElementRef<HTMLInputElement>[];
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
	) {}

	ngOnInit() {
		this.authService.getMe().subscribe(
			user => {
				if (user.data.role === 'admin') {
					this.userService.getAllUsers(100000).subscribe(allUsers => {
						this.allUsersData = allUsers;
						console.log(this.allUsersData);
					});
					this.contactService.getAllMessages(100000).subscribe(allMessages => {
						this.allMessagesData = allMessages;
						console.log(this.allMessagesData);
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

	//usercommands
	deleteProfile() {
		this.dataService.showNotification('Profile delete not ready!', true);
	}

	deleteHotel() {
		this.locationService.deleteLocation(this.location.data[0]._id).subscribe((this.location = undefined));
		this.dataService.showNotification('Hotel deleted successfully!', true);
	}

	editHotel() {
		this.checkAnimalsEdit(event);
		this.checkServicesEdit(event);
		this.locationService
			.updateLocation(this.location.data[0]._id, this.location.data[0], this.userData.data._id)
			.subscribe(location => {
				console.log(location.data.title + 'incoming location logg');
				this.location.data[0] = location.data;
				this.dataService.showNotification('Hotel edited successfully!', true);
			});
		this.uncheck();
	}

	addHotel() {
		console.log(this.newLocation.animalTypes);
		console.log(this.newLocation.services);
		console.log(this.newLocation.costType);
		this.locationService.createLocation(this.newLocation, this.userData.data._id).subscribe();
		this.ngOnInit();
		this.dataService.showNotification('New hotel added succesfully!', true);
	}
	checkAnimalsNew(event: Event) {
		if ((<HTMLInputElement>event.target).checked === true) {
			this.newLocation.animalTypes.push((<HTMLInputElement>event.target).value);
		}
		if ((<HTMLInputElement>event.target).checked === false) {
			this.newLocation.animalTypes = this.newLocation.animalTypes.filter(
				e => e !== (<HTMLInputElement>event.target).value
			);
		}
	}

	checkServicesNew(event: Event) {
		if ((<HTMLInputElement>event.target).checked === true) {
			this.newLocation.services.push((<HTMLInputElement>event.target).value);
		}
		if ((<HTMLInputElement>event.target).checked === false) {
			this.newLocation.services = this.newLocation.services.filter(
				e => e !== (<HTMLInputElement>event.target).value
			);
		}
	}

	checkAnimalsEdit(event: Event) {
		// this.location.data[0].animalTypes.filter((a, b) => this.location.data[0].animalTypes.indexOf(a) === b);
		if ((<HTMLInputElement>event.target).checked === true) {
			this.location.data[0].animalTypes.push((<HTMLInputElement>event.target).value);
			console.log(this.location.data[0].animalTypes);
		}
		if ((<HTMLInputElement>event.target).checked === false) {
			// this.location.data[0].animalTypes.splice(
			// 	this.location.data[0].animalTypes.indexOf((<HTMLInputElement>event.target).value, 1)
			// );
			// console.log(this.location.data[0].animalTypes);
			this.location.data[0].animalTypes = this.location.data[0].animalTypes.filter(
				e => e !== (<HTMLInputElement>event.target).value
			);
			console.log(this.location.data[0].animalTypes);
		}
	}

	checkServicesEdit(event: Event) {
		// this.location.data[0].services.filter((a, b) => this.location.data[0].services.indexOf(a) === b);
		if ((<HTMLInputElement>event.target).checked === true) {
			this.location.data[0].services.push((<HTMLInputElement>event.target).value);
			console.log(this.location.data[0].services);
		}
		if ((<HTMLInputElement>event.target).checked === false) {
			// 	this.location.data[0].services.splice(
			// 		this.location.data[0].services.indexOf((<HTMLInputElement>event.target).value, 1)
			// 	);
			// }
			this.location.data[0].services = this.location.data[0].services.filter(
				e => e !== (<HTMLInputElement>event.target).value
			);
			console.log(this.location.data[0].services);
		}
	}
	// getCheckboxValueAnimalTypes(event: Event) {
	// 	this.location.data[0].animalTypes.filter((a, b) => this.location.data[0].animalTypes.indexOf(a) === b);
	// 	this.newLocation.animalTypes.filter((a, b) => this.newLocation.animalTypes.indexOf(a) === b);
	// 	if ((<HTMLInputElement>event.target).checked === true && this.location === undefined) {
	// 		this.newLocation.animalTypes.push((<HTMLInputElement>event.target).value);
	// 	} else if ((<HTMLInputElement>event.target).checked === true && this.location !== undefined) {
	// 		this.location.data[0].animalTypes.push((<HTMLInputElement>event.target).value);
	// 	} else if ((<HTMLInputElement>event.target).checked === false && this.location === undefined) {
	// 		this.newLocation.animalTypes.splice(
	// 			this.newLocation.animalTypes.indexOf((<HTMLInputElement>event.target).value),
	// 			1
	// 		);
	// 		this.newLocation.animalTypes.filter((a, b) => this.newLocation.animalTypes.indexOf(a) === b);
	// 	} else if ((<HTMLInputElement>event.target).checked === false && this.location !== undefined) {
	// 		this.location.data[0].animalTypes.splice(
	// 			this.location.data[0].animalTypes.indexOf((<HTMLInputElement>event.target).value, 1)
	// 		);
	// 		this.location.data[0].animalTypes.filter((a, b) => this.location.data[0].animalTypes.indexOf(a) === b);
	// 		console.log(this.newLocation.services);
	// 		console.log(this.newLocation.costType);
	// 	}
	// }

	// getCheckboxValueAnimalServices(event: Event) {
	// 	this.location.data[0].services.filter((a, b) => this.location.data[0].services.indexOf(a) === b);
	// 	this.newLocation.services.filter((a, b) => this.newLocation.services.indexOf(a) === b);
	// 	if ((<HTMLInputElement>event.target).checked === true && this.location === undefined) {
	// 		this.newLocation.services.push((<HTMLInputElement>event.target).value);
	// 	} else if ((<HTMLInputElement>event.target).checked === true && this.location !== undefined) {
	// 		this.location.data[0].services.push((<HTMLInputElement>event.target).value);
	// 	} else if ((<HTMLInputElement>event.target).checked === false && this.location === undefined) {
	// 		this.newLocation.services.splice(
	// 			this.newLocation.services.indexOf((<HTMLInputElement>event.target).value),
	// 			1
	// 		);
	// 		this.newLocation.services.filter((a, b) => this.newLocation.services.indexOf(a) === b);
	// 	} else if ((<HTMLInputElement>event.target).checked === false && this.location !== undefined) {
	// 		this.location.data[0].services.splice(
	// 			this.location.data[0].services.indexOf((<HTMLInputElement>event.target).value, 1)
	// 		);
	// 		this.location.data[0].services.filter((a, b) => this.location.data[0].services.indexOf(a) === b);
	// 		console.log(this.newLocation.services);
	// 		console.log(this.newLocation.costType);
	// 	}
	// }
	getCostTypeValue(event: Event) {
		if ((<HTMLInputElement>event.target).checked === true && this.location === undefined) {
			this.newLocation.costType = (<HTMLInputElement>event.target).value;
		}
		if ((<HTMLInputElement>event.target).checked === true && this.location !== undefined) {
			this.location.data[0].costType = (<HTMLInputElement>event.target).value;
		}
	}
	oldValues() {
		console.log('cliccked');
		console.log(this.location.data[0].animalTypes);
		console.log(this.location.data[0].services);
		this.inputsEdit.forEach(check => {
			if (this.location.data[0].animalTypes.includes(check.nativeElement.value)) {
				check.nativeElement.checked = true;
				console.log(1);
			}
			if (this.location.data[0].services.includes(check.nativeElement.value)) {
				check.nativeElement.checked = true;
				console.log(2);
			}
			// if (this.location.data[0].costType.includes(check.nativeElement.value)) {
			// 	check.nativeElement.checked = true;
			// }
		});
		// this.inputs.forEach(check => {
		// 	console.log(this.location.data.animalTypes);
		// 	console.log(check.nativeElement.value, 'tämä');
		// if (this.location.data.animalTypes.includes(check.nativeElement.value)) {
		// 	check.nativeElement.checked = true;
		// }
		// });
	}

	uncheck() {
		this.inputsEdit.forEach(check => {
			check.nativeElement.checked = false;
		});
	}

	//admincommands
	deleteUser(deleteId) {
		console.log(deleteId);
		this.userService.deleteUser(deleteId).subscribe();
		this.userService.getAllUsers(100000).subscribe(allUsers => {
			this.allUsersData = allUsers;
			console.log(this.allUsersData);
		});
		this.dataService.showNotification('User deleted successfully!', true);
	}

	deleteMessage(deleteId) {
		console.log(deleteId);
		this.contactService.deleteMessage(deleteId).subscribe();
		this.contactService.getAllMessages(100000).subscribe(allMessages => {
			this.allMessagesData = allMessages;
			console.log(this.allMessagesData);
		});
		this.dataService.showNotification('Message deleted successfully!', true);
	}

	passDeleteMessageData(id, msg) {
		console.log(id);
		document.getElementById('deleteMessageModalLabel').innerHTML =
			'Are you sure you want to delete message: "<b>' + msg + '"</b>?';
		document.getElementById('deleteMessageId').addEventListener('click', () => this.deleteMessage(id));
	}

	passDeleteUserData(id, name) {
		console.log(id);
		document.getElementById('deleteUserModalLabel').innerHTML =
			'Are you sure you want to delete user: "<b>' + name + '"</b>?';
		document.getElementById('deleteUserId').addEventListener('click', () => this.deleteUser(id));
	}
}
