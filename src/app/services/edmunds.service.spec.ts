import { async, getTestBed, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { HttpService } from './http.service';
import { EdmundsService } from './edmunds.service';
import { EdmundsDefaultsService } from './edmunds-defaults.service';

describe('EdmundsService', () => {
    let testbed: TestBed;
    let mockBackend: MockBackend;
    let service: EdmundsService;
    let mockResponse: any;
    let mockEdmundsDefaults: any;
    
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
                    provide: HttpService,
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
        
        //mockBackend
        //    .connections
        //    .subscribe((connection: MockConnection) => {
        //        connection.mockRespond(new Response(new ResponseOptions(mockResponse)));
        //    });
        
    }));
    
    describe('get()', () => {
    
        it('should apply EdmundsDefaults to the request', async(() => {
    
            mockBackend
                .connections
                .subscribe((connection: MockConnection) => {
                    expect(connection.request.url).toMatch(mockEdmundsDefaults.api_base);
                    expect(connection.request.url).toMatch('test=test');
                });
        
            service.get('something');
        }));
    
        it('should apply params to the request', async(() => {
            mockBackend
                .connections
                .subscribe((connection: MockConnection) => {
                    expect(connection.request.url).toMatch('paramKey=paramValue');
                    expect(connection.request.url).toMatch('test=newTest');
                });
        
            service.get('something', {}, {paramKey: 'paramValue', test: 'newTest'});
        }));
    
        it('should make a "makes" request', async(() => {
        
            const url = `${mockEdmundsDefaults.api_base}api/vehicle/v2/makes`;
        
            mockBackend
                .connections
                .subscribe((connection: MockConnection) => {
                    expect(connection.request.url).toMatch(url);
                });
        
            service.get('makes');
        }));
    
        it('should make a "style" request', async(() => {
        
            const options = {
                id: 123
            };
        
            const url = `${mockEdmundsDefaults.api_base}api/vehicle/v2/styles/${options.id}`;
        
            mockBackend
                .connections
                .subscribe((connection: MockConnection) => {
                    expect(connection.request.url).toMatch(url);
                });
        
            service.get('style', options);
        }));
    
        it('should make a "styles" request', async(() => {
        
            const options = {
                makeNiceName: 123,
                modelNiceName: 123,
                year: 2000
            };
        
            const url = `${mockEdmundsDefaults.api_base}api/vehicle/v2/${options.makeNiceName}/${options.modelNiceName}/${options.year}/styles`;
        
            mockBackend
                .connections
                .subscribe((connection: MockConnection) => {
                    expect(connection.request.url).toMatch(url);
                });
        
            service.get('styles', options);
        }));
    });
});
