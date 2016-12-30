import {getTestBed, TestBed, async, inject} from '@angular/core/testing';
import {BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import {DataEdmundsService} from './data-edmunds.service';

describe('Service: DataEdmundsService', () => {

  let backend: MockBackend;
  let service: DataEdmundsService;
  let setupConnections: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        DataEdmundsService,
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

    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    service = testbed.get(DataEdmundsService);

    setupConnections = function (backend: MockBackend, options: any) {
      backend.connections.subscribe((connection: MockConnection) => {
        if (connection.request.url === 'https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=00000') {
          const responseOptions = new ResponseOptions(options);
          const response = new Response(responseOptions);
          connection.mockRespond(response);
        }
      });
    }
  }));

  it('should return ...', () => {
    setupConnections(backend, {
      body: [
        {
          id: 1,
          questions: [],
          title: 'Pizza'
        },
        {
          id: 4,
          questions: [],
          title: 'Burrito'
        },
        {
          id: 2,
          questions: [],
          title: 'Cheeseburger'
        }
      ],
      status: 200
    });

    service.getEdmundsAllMakes().subscribe(data => console.log(data));
  });

});
