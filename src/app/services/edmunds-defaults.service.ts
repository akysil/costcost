import { Injectable } from '@angular/core';

@Injectable()
export class EdmundsDefaultsService {
	
	public api_base: string;
	public params: {
		api_key: string;
		fmt: string;
		view: string;
	};
	
	constructor() {
		this.api_base = 'https://api.edmunds.com/api/vehicle/v2/';
		this.params = {
			api_key: 'z6d9yj4dkf8kjmn46gttx7mv',
			fmt: 'json',
			view: 'basic'
		};
	}
}
