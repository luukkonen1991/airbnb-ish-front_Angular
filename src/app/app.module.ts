import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

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
import { LocationComponent } from './components/location/location.component';
import { FooterComponent } from './components/footer/footer.component';

import { LocationService } from './services/location.service';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { CurrentUserComponent } from './components/current-user/current-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

// envs
import { environment } from './environment/environment';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ReviewsModalComponent } from './components/reviews-modal/reviews-modal.component';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		LocationsComponent,
		HomeComponent,
		FormComponent,
		LocationComponent,
		BecomeHostComponent,
		ContactComponent,
		SignupLoginComponent,
		AboutComponent,
		FooterComponent,
		CurrentUserComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		ResetPasswordComponent,
		StarRatingComponent,
		ReviewsModalComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		AgmCoreModule.forRoot({
			apiKey: environment.GOOGLE_API_KEY
		})
	],
	providers: [
		LocationService,
		DataService,
		AuthService,
		CookieService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {}
