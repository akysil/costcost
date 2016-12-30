import { TestBed, async, inject } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import { DataEdmundsService } from './data-edmunds.service';

describe('LocalStorageService', () => {
	
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				LocalStorageService,
				{
					provide: DataEdmundsService,
					useValue: null
				}
			]
		});
	});
	
	it('should ...', inject([LocalStorageService], (service: LocalStorageService) => {
		expect(service).toBeTruthy();
	}));
});
