import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LocationsComponent } from "./components/locations/locations.component";
import { HomeComponent } from "./components/home/home.component";
import { FormComponent } from "./components/form/form.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LocationsComponent,
    HomeComponent,
    FormComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
