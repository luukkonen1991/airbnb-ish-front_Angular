import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LocationsComponent } from './components/locations/locations.component';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { BecomeHostComponent } from './components/become-host/become-host.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignupLoginComponent } from './components/signup-login/signup-login.component';
import { AboutComponent } from './components/about/about.component';

import { LocationService } from './services/location.service';
import { DataService } from './services/data.service';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		LocationsComponent,
		HomeComponent,
		FormComponent,
		BecomeHostComponent,
		ContactComponent,
		SignupLoginComponent,
		AboutComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule
	],
	providers: [
		LocationService,
		DataService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {}
