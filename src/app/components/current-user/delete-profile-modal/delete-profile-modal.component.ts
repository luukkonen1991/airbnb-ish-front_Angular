import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../../models/User';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-delete-profile-modal',
	templateUrl: './delete-profile-modal.component.html',
	styleUrls: [
		'./delete-profile-modal.component.css'
	]
})
export class DeleteProfileModalComponent implements OnInit {
	@Input() userData: User;
	constructor(private userService: UserService, private dataService: DataService, private router: Router) {}

	ngOnInit() {
		console.log(this.userData);
	}

	deleteProfile() {
		this.userService.deleteUser(this.userData.data._id).subscribe(
			res => {
				console.log(res);
				this.dataService.showNotification('User deleted successfully!', true);
				sessionStorage.removeItem('token');
				this.router.navigate([
					''
				]);
			},
			error => {
				if (error.error.success === false) {
					this.dataService.showNotification(
						'Error occured while deleating user profile. Contact support or try again later.',
						false
					);
				}
			}
		);
	}
}
