import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { EdmundsDefaultsService } from './edmunds-defaults.service';

@Injectable()
export class EdmundsService {
    
    constructor(private http: Http, private edmundsDefaults: EdmundsDefaultsService) {
        //
    }
    
    public get = (query: string, options: Object = {}, params: Object = {}): Observable<any> => {
        
        let urlPrefix: any = this.urlPrefix(query, options);
    
        return (urlPrefix instanceof Error) ?
            Observable.throw(urlPrefix) :
            Observable.create((observer: any) => {
                
                const search = this.searchParams(params);
                const options = new RequestOptions({
                    method: RequestMethod.Get,
                    url: this.edmundsDefaults.api_base + urlPrefix,
                    search
                });
                const request = new Request(options);
                
                let local = localStorage.getItem(request.url);
                if (local) {
                    observer.next(JSON.parse(local));
                    observer.complete();
                } else {
                    this.http
                        .request(request)
                        .subscribe((response) => {
                            localStorage.setItem(request.url, JSON.stringify(response.json()));
                            observer.next(response.json());
                            observer.complete();
                        });
                }
            });
    };
    
    private urlPrefix = function (query: string, options: Object): string | Error {
    
        let prefix = composePrefix(options);
        
        if (!prefix) {
            return new Error(`Unrecognized Edmunds query "${query}"!`);
        }
        
        if (prefix.indexOf('undefined') > -1) {
            return new Error(`Missed options in Edmunds query "${query}"!`);
        }
        
        return prefix;
        
        function composePrefix(keys: any) {
            
            let pat = {
                makes: `api/vehicle/v2/makes`,
                style: `api/vehicle/v2/styles/${keys.id}`,
                styles: `api/vehicle/v2/${keys.makeNiceName}/${keys.modelNiceName}/${keys.year}/styles`,
                equipment: `api/vehicle/v2/styles/${keys.styleId}/equipment`,
                rating: `api/vehiclereviews/v2/styles/${keys.id}`,
                tmv: `v1/api/tmv/tmvservice/calculatenewtmv?styleid=${keys.styleId}&zip=${keys.zip}`,
                tco: `v1/api/tco/newtruecosttoownbystyleidandzip/${keys.styleId}/${keys.zip}`
            };
            
            return pat[query];
        }
    };
    
    private searchParams = function (params: Object): URLSearchParams {
        
        let searchParams: URLSearchParams = new URLSearchParams();
        let unitedParams = Object.assign({}, this.edmundsDefaults.params, params);
        Object
            .keys(unitedParams)
            .forEach((key) => searchParams.set(key, unitedParams[key]));
        return searchParams;
    };
}
