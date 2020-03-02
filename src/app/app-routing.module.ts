import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BecomeHostComponent } from './components/become-host/become-host.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignupLoginComponent } from './components/signup-login/signup-login.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [ {
  path: 'home',
  component: HomeComponent
},{
  path: 'about',
  component: AboutComponent
},{
  path: 'becomehost',
  component: BecomeHostComponent
},{
  path: 'contact',
  component: ContactComponent
},{
  path: 'signuplogin',
  component: SignupLoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
