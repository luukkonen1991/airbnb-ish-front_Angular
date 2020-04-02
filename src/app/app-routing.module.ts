import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationComponent } from './components/location/location.component';
import { HomeComponent } from './components/home/home.component';
import { BecomeHostComponent } from './components/become-host/become-host.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { CurrentUserComponent } from './components/current-user/current-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'about',
		component: AboutComponent
	},
	{
		path: 'becomehost',
		component: BecomeHostComponent
	},
	{
		path: 'contact',
		component: ContactComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'location/:slug:',
		component: LocationComponent
	},
	{
		path: 'me',
		component: CurrentUserComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'forgotpassword',
		component: ForgotPasswordComponent
	},
	{
		path: 'resetpassword/:token',
		component: ResetPasswordComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			anchorScrolling: 'enabled',
			scrollOffset: [
				0,
				30
			]
		})
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}
