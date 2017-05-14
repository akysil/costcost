import { Injectable } from '@angular/core';
import { ConnectionBackend, Http, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CacheService } from './cache.service';

@Injectable()
export class HttpService extends Http {
    
    constructor(backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        private cache: CacheService) {
        super(backend, defaultOptions);
    }
    
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        
        const key = (url instanceof Request) ? url.url : url;
        const cachedValue = this.cache.get(key);
        
        if (cachedValue) {
            return Observable.of(cachedValue);
        }
        
        return super.request(url, options)
            .map((response: any) => response.json())
            .do((value: any) => this.cache.set(key, value));
    }
}
