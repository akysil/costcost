import { async, getTestBed, TestBed } from '@angular/core/testing';

import { PreferencesService } from './preferences.service';

describe('PreferencesService', () => {
    let testbed: TestBed;
    let service: PreferencesService;
    
    beforeEach(async(() => {
        
        TestBed.configureTestingModule({
            providers: [
                PreferencesService
            ]
        });
        
        testbed = getTestBed();
        service = testbed.get(PreferencesService);
        
    }));
    
    it('should be defined', async(() => {
        expect(service).toBeDefined();
    }));
});