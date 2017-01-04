import { async, getTestBed, TestBed } from '@angular/core/testing';

import { DataHandlersService } from './data-handlers.service';

describe('EdmundsDefaultsService', () => {
    let testbed: TestBed;
    let service: DataHandlersService;
    
    beforeEach(async(() => {
        
        TestBed.configureTestingModule({
            providers: [
                DataHandlersService
            ]
        });
        
        testbed = getTestBed();
        service = testbed.get(DataHandlersService);
        
    }));
    
    it('should be defined', async(() => {
        expect(service).toBeDefined();
    }));
    
    describe('allMakes', () => {
        
        it('should be defined', async(() => {
            expect(service.allMakes).toBeDefined();
        }));
        
        it('should convert data', async(() => {
            let mockData = {
                makes: [
                    {name: 'Acura'}
                ]
            };
            
            expect(service.allMakes(mockData)).toEqual(['Acura']);
        }));
        
    });
});