import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationComponent } from './components/location/location.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'location/:_id', component: LocationComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}
