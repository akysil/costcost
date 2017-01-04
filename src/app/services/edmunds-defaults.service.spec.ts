import { async, getTestBed, TestBed } from '@angular/core/testing';

import { EdmundsDefaultsService } from './edmunds-defaults.service';

describe('EdmundsDefaultsService', () => {
    let testbed: TestBed;
    let service: EdmundsDefaultsService;
    
    beforeEach(async(() => {
        
        TestBed.configureTestingModule({
            providers: [
                EdmundsDefaultsService
            ]
        });
        
        testbed = getTestBed();
        service = testbed.get(EdmundsDefaultsService);
        
    }));
    
    it('should be defined', async(() => {
        expect(service).toBeDefined();
    }));
});