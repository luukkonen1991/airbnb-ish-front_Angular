import { Component, OnInit } from '@angular/core';

import { ContactMessage } from 'src/app/models/ContactMessage';
import { DataService } from 'src/app/services/data.service';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-contact-form',
	templateUrl: './contact.component.html',
	styleUrls: [
		'./contact.component.css'
	]
})
export class ContactComponent implements OnInit {
	contactMessage: ContactMessage = {
		success: true,
		data: {
			name: '',
			email: '',
			phone: '',
			message: ''
		}
	};
	form: any;
	msg: any;
	errorState: string = '';

	constructor(private contactService: ContactService, private dataService: DataService, private router: Router) {}

	ngOnInit() {}

	onSubmit($event: any) {
		this.contactService
			.sendMessage(
				this.contactMessage.data.name,
				this.contactMessage.data.email,
				this.contactMessage.data.phone,
				this.contactMessage.data.message
			)
			.subscribe(
				res => {
					if (res.success === true) {
						this.dataService.showNotification('Message succesfully sent!', true);
						this.router.navigate([
							''
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
