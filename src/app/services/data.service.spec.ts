import { async, getTestBed, TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { EdmundsService } from './edmunds.service';
import { Observable } from 'rxjs';
import { DataHandlersService } from './data-handlers.service';

describe('DataService', () => {
    let testbed: TestBed;
    let dataService: DataService;
    let mockData: any;
    let edmundsServiceError: boolean;
    
    beforeEach(async(() => {
        
        TestBed.configureTestingModule({
            providers: [
                DataService,
                {
                    provide: DataHandlersService,
                    useValue: {
                        allMakes: (data: any) => data
                    }
                },
                {
                    provide: EdmundsService,
                    useValue: {
                        get: () => {
                            if (edmundsServiceError) {
                                return Observable.throw(new Error(`Test error!`));
                            }
                            return Observable.create((observer: any) => {
                                observer.next(mockData);
                                observer.complete();
                            });
                        }
                    }
                }
            ]
        });
        
        testbed = getTestBed();
        dataService = testbed.get(DataService);
        
    }));
    
    it('should be defined', async(() => {
        expect(dataService).toBeDefined();
    }));
    
    describe('get()', () => {
        
        it('should be defined', async(() => {
            expect(dataService.get).toBeDefined();
        }));
        
        it('should return Error when query is unrecognized', async(() => {
            dataService.get('blah-blah-blah').subscribe(
                () => {},
                (e) => {
                    expect(e.message).toBe('Unrecognized Data query "blah-blah-blah"!');
                }
            );
        }));
    
        it('should return data', async(() => {
        
            mockData = {
                makes: ['test']
            };
        
            dataService.get('allMakes').subscribe(data => {
                expect(data).toBe(mockData);
            });
        
        }));
        
    });
    
});
