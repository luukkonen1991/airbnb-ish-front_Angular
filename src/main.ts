import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { environment as environmentVar } from './app/environment/environment';

let apiKey: string = environmentVar.GOOGLE_API_KEY;

if (environment.production) {
	document.write(
		`<script src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=en"></script>`
	);
	enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
