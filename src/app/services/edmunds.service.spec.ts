import { async, getTestBed, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { EdmundsService } from './edmunds.service';
import { EdmundsDefaultsService } from './edmunds-defaults.service';

describe('EdmundsService', () => {
    let testbed: TestBed;
    let mockBackend: MockBackend;
    let service: EdmundsService;
    let mockResponse: any;
    let mockEdmundsDefaults: any;
    let makeParams: {
        (params: Object): Array<String>
    };
    
    beforeEach(async(() => {
        
        mockEdmundsDefaults = {
            api_base: 'https://EdmundsDefaults/',
            params: {
                test: 'test'
            }
        };
        
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
    
        makeParams = (params) => {
            return Object.keys(params).map((key) => `${key}=${params[key]}`);
        };
        
        TestBed.configureTestingModule({
            providers: [
                BaseRequestOptions,
                MockBackend,
                EdmundsService,
                {
                    deps: [
                        MockBackend,
                        BaseRequestOptions
                    ],
                    provide: Http,
                    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                },
                {
                    provide: EdmundsDefaultsService,
                    useValue: mockEdmundsDefaults
                }
            ]
        });
        
        testbed = getTestBed();
        mockBackend = testbed.get(MockBackend);
        service = testbed.get(EdmundsService);
        
    }));
    
    describe('get()', () => {
        
        it('should return data on subscribe', async(() => {
            
            mockBackend
                .connections
                .subscribe((connection: MockConnection) => {
                    connection.mockRespond(new Response(new ResponseOptions(mockResponse)));
                });
            
            service.get('makes').subscribe(data => {
                expect(data).toBe(mockResponse.body);
            });
        }));
        
        it('should return compose url from options', async(() => {
            
            let mockQuery = 'details';
            
            let mockQueryOptions = {
                maker: 'Maker',
                model: 'Model',
                year: 'Year',
                trim: 'Trim',
                unused: 'Unused'
            };
            
            mockBackend
                .connections
                .subscribe((connection: MockConnection) => {
                    expect(connection.request.url)
                        .toBe(mockEdmundsDefaults.api_base +
                            mockQuery + '/' +
                            mockQueryOptions.maker + '/' +
                            mockQueryOptions.model + '/' +
                            mockQueryOptions.year + '/' +
                            mockQueryOptions.trim + '?' +
                            makeParams(mockEdmundsDefaults.params).join('&')
                        );
                });
            
            service.get(mockQuery, mockQueryOptions);
        }));
        
        it('should include default params in the URL', async(() => {
            
            mockBackend
                .connections
                .subscribe((connection: MockConnection) => {
                    expect(
                        makeParams(mockEdmundsDefaults.params)
                            .every((pair: string) =>
                                Boolean(connection.request.url.indexOf(pair)))
                    )
                        .toBeTruthy();
                });
            
            service.get('makes');
        }));
        
        it('should include custom params and overwrite defaults', async(() => {
            
            let customParams = {
                foo: 'bar',
                test: 'newTest'
            };
            
            mockBackend
                .connections
                .subscribe((connection: MockConnection) => {
                    expect(
                        makeParams(customParams)
                            .every((pair: string) =>
                                Boolean(connection.request.url.indexOf(pair)))
                    )
                        .toBeTruthy();
                });
            
            service.get('makes', {}, customParams);
        }));
        
        it('should return Error when required query options are missed', async(() => {
            try {
                service
                    .get('details', {model: 'Test'})
                    .subscribe();
            } catch (e) {
                expect(e.message).toBe('Missed options in Edmunds query "details"!');
            }
        }));
        
        it('should return Error when query is unrecognized', async(() => {
            try {
                service
                    .get('blah-blah-blah')
                    .subscribe();
            } catch (e) {
                expect(e.message).toBe('Unrecognized Edmunds query "blah-blah-blah"!');
            }
        }));
    });
});
