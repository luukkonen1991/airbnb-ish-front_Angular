import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

const myScripts = [
	{
		name: 'GoogleAutoComplete',
		src: `https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_API_KEY}&libraries=places&language=en`
	}
];

@Injectable({
	providedIn: 'root'
})
export class ScriptService {
	private scripts: any = {};

	constructor() {
		myScripts.forEach((script: any) => {
			this.scripts[script.name] = {
				loaded: false,
				src: script.src
			};
		});
	}

	// load a single or multiple scripts
	load(...scripts: string[]) {
		const promises: any[] = [];
		// push the returned promise of each loadScript call
		scripts.forEach(script => promises.push(this.loadScript(script)));
		// return promise.all that resolves when all promises are resolved
		return Promise.all(promises);
	}

	// load the script
	loadScript(name: string) {
		return new Promise((resolve, reject) => {
			// resolve if already loaded
			if (this.scripts[name].loaded) {
				resolve({ script: name, loaded: true, status: 'Already Loaded' });
			} else {
				// load script
				const script: any = document.createElement('script');
				script.type = 'text/javascript';
				script.src = this.scripts[name].src;
				// cross browser handling of onLoaded event
				if (script.readyState) {
					// IE
					script.onreadystatechange = () => {
						if (script.readyState === 'loaded' || script.readyState === 'complete') {
							script.onreadystatechange = null;
							this.scripts[name].loaded = true;
							resolve({ script: name, loaded: true, status: 'Loaded' });
						}
					};
				} else {
					// Others
					script.onload = () => {
						this.scripts[name].loaded = true;
						resolve({ script: name, loaded: true, status: 'Loaded' });
					};
				}
				script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
				// finally append the script tag in the DOM
				document.getElementsByTagName('head')[0].appendChild(script);
			}
		});
	}
}
