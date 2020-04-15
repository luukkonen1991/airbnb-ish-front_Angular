import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { User } from '../../models/User';
import { LocationService } from 'src/app/services/location.service';
import { LocationById } from 'src/app/models/LocationById';
import { UpdateLocation } from '../../models/UpdateLocation';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { ReviewService } from 'src/app/services/review.service';
import { ContactService } from 'src/app/services/contact.service';
import { ContactMessage } from 'src/app/models/ContactMessage';
import { Reviews } from 'src/app/models/Reviews';
import { Review } from 'src/app/models/Review';
import { ViewportScroller } from '@angular/common';

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
	newReviewData: Review;
	infoData: Review;
	allMessagesData: ContactMessage;
	allReviewsData: Reviews;
	location: LocationById = undefined;
	selectedFile: File = null;
	selectedId: string = null;
	reviews: Reviews['data'];
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
	photoUrl: '';

	constructor(
		private authService: AuthService,
		private locationService: LocationService,
		private dataService: DataService,
		private userService: UserService,
		private contactService: ContactService,
		private reviewService: ReviewService,
		private viewPortScroller: ViewportScroller
	) { }

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
					this.reviewService.getAllReviews(100000).subscribe(allReviews => {
						this.allReviewsData = allReviews;
						console.log(this.allReviewsData);
					});
				}
				this.reviewService.getUserReviews(user.data._id).subscribe(
					reviews => {
						console.log(reviews + 'REviewsLOGGG');
						this.reviews = reviews.data;
						console.log(this.reviews);
					},
					error => {
						console.log(error);
					}
				)
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
		this.locationService.deleteLocation(this.location.data[0]._id).subscribe(
			res => {
				console.log(res);
				this.location = undefined;
				this.dataService.showNotification('Hotel deleted successfully!', true);
			},
			error => {
				if (error.error.success === false) {
					this.dataService.showNotification(error.error.error, false);
				}
			}
		);
	}

	editHotel() {
		this.checkAnimalsEdit(event);
		this.checkServicesEdit(event);
		this.locationService
			.updateLocation(this.location.data[0]._id, this.location.data[0], this.userData.data._id)
			.subscribe(
				location => {
					console.log(location.data.title + 'incoming location logg');
					this.location.data[0] = location.data;
					this.dataService.showNotification('Hotel edited successfully!', true);
				},
				error => {
					if (error.error.success === false) {
						this.dataService.showNotification(error.error.error, false);
					}
				}
			);
		this.uncheck();
	}

	addHotel() {
		this.locationService.createLocation(this.newLocation, this.userData.data._id).subscribe(
			res => {
				if (res.success === true) {
					this.ngOnInit();
					this.dataService.showNotification('New hotel added succesfully!', true);
				}
			},
			error => {
				if (error.error.success === false) {
					console.log(error.error.error);
					this.dataService.showNotification(error.error.error, false);
				}
			}
		);
	}

	onFileSelected(event) {
		this.selectedFile = <File>event.target.files[0];
	}

	onUpload() {
		const fd = new FormData();
		fd.append('file', this.selectedFile);
		this.locationService.uploadPhoto(this.location.data[0]._id, fd).subscribe(
			photo => {
				if (photo.success === true) {
					console.log(this.location.data[0]);
					this.location.data[0].photo = photo.data;
					this.dataService.showNotification('Photo changed succesfully!', true);
				}
			},
			error => {
				console.log(error);
				if (error.error.success === false) {
					this.dataService.showNotification(error.error.error, false);
				}
			}
		);
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
		if ((<HTMLInputElement>event.target).checked === true) {
			this.location.data[0].animalTypes.push((<HTMLInputElement>event.target).value);
			console.log(this.location.data[0].animalTypes);
		}
		if ((<HTMLInputElement>event.target).checked === false) {
			this.location.data[0].animalTypes = this.location.data[0].animalTypes.filter(
				e => e !== (<HTMLInputElement>event.target).value
			);
			console.log(this.location.data[0].animalTypes);
		}
	}

	checkServicesEdit(event: Event) {
		if ((<HTMLInputElement>event.target).checked === true) {
			this.location.data[0].services.push((<HTMLInputElement>event.target).value);
			console.log(this.location.data[0].services);
		}
		if ((<HTMLInputElement>event.target).checked === false) {
			this.location.data[0].services = this.location.data[0].services.filter(
				e => e !== (<HTMLInputElement>event.target).value
			);
			console.log(this.location.data[0].services);
		}
	}

	getCostTypeValue(event: Event) {
		if ((<HTMLInputElement>event.target).checked === true && this.location === undefined) {
			this.newLocation.costType = (<HTMLInputElement>event.target).value;
		}
		if ((<HTMLInputElement>event.target).checked === true && this.location !== undefined) {
			this.location.data[0].costType = (<HTMLInputElement>event.target).value;
		}
	}
	oldValues() {
		this.inputsEdit.forEach(check => {
			if (this.location.data[0].animalTypes.includes(check.nativeElement.value)) {
				check.nativeElement.checked = true;
				console.log(1);
			}
			if (this.location.data[0].services.includes(check.nativeElement.value)) {
				check.nativeElement.checked = true;
				console.log(2);
			}
		});
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

	deleteReview(deleteId) {
		console.log(deleteId);
		this.reviewService.deleteReview(deleteId).subscribe();
		this.reviewService.getAllReviews(100000).subscribe(allReviews => {
			this.allReviewsData = allReviews;
			console.log(this.allReviewsData);
		});
		this.dataService.showNotification('Review deleted successfully!', true);
	}

	passDeleteMessageData(id, msg) {
		console.log(id);
		document.getElementById('deleteMessageModalLabel').innerHTML =
			'Are you sure you want to delete message: "<b>' + msg + '"</b>?';
		document.getElementById('deleteMessageId').addEventListener('click', () => {
			this.deleteMessage(id)
			this.ngOnInit();
		});
	}

	passDeleteUserData(id, name) {
		console.log(id);
		document.getElementById('deleteUserModalLabel').innerHTML =
			'Are you sure you want to delete user: "<b>' + name + '"</b>?';
		document.getElementById('deleteUserId').addEventListener('click', () =>  {
			this.deleteUser(id)
			this.ngOnInit();
		});
	}
	passDeleteReviewData(id, title) {
		console.log(id);
		document.getElementById('deleteReviewModalLabel').innerHTML =
			'Are you sure you want to delete review: "<b>' + title + '"</b>?';
		document.getElementById('deleteReviewId').addEventListener('click', () =>  {
			this.deleteReview(id);
			this.ngOnInit();
		});
	}

	info(info) {
		this.infoData = info;
		console.log(info);
	}

	receiveReviewInput($event) {
		this.newReviewData = $event;
		console.log(this.newReviewData);
		this.reviewService.editLocationReview(this.infoData._id, this.newReviewData).subscribe(
			res => {
				if (res.success === true) {
					this.viewPortScroller.scrollToPosition([
						0,
						0
					]);
					this.ngOnInit();
					this.dataService.showNotification('New review added succesfully!', true);
				}
			},
			error => {
				if (error.error.success === false) {
					this.viewPortScroller.scrollToPosition([
						0,
						0
					]);
					this.dataService.showNotification('User can add only one review per PetHotel', false);
				}
			}
		);
	}
}
