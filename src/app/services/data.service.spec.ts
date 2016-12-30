import { async, getTestBed, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { DataService } from './data.service';

describe('Service: DataService', () => {
	
	let testbed: TestBed;
	let mockBackend: MockBackend;
	let service: DataService;
	let setupConnections: any;
	let mockResponse: any;
	
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				BaseRequestOptions,
				MockBackend,
				DataService,
				{
					deps: [
						MockBackend,
						BaseRequestOptions
					],
					provide: Http,
					useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
						return new Http(backend, defaultOptions);
					}
				}
			]
		});
		
		testbed      = getTestBed();
		mockBackend  = testbed.get(MockBackend);
		service      = testbed.get(DataService);
		mockResponse = {
			body: [
				{
					id: 1,
					questions: [],
					title: 'Car'
				}
			],
			status: 200
		};
		
		setupConnections = function (url: string,
		                             backend: MockBackend = mockBackend,
		                             options: any = mockResponse) {
			backend.connections.subscribe((connection: MockConnection) => {
				if (connection.request.url === url) {
					const responseOptions = new ResponseOptions(options);
					const response        = new Response(responseOptions);
					connection.mockRespond(response);
				}
			});
		};
	}));
	
	it('should get getEdmundsAllMakes', async(() => {
		setupConnections('https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=z6d9yj4dkf8kjmn46gttx7mv');
		
		service.getEdmundsAllMakes().subscribe(data => {
			expect(data).toBe(mockResponse.body);
		});
	}));
	
});
