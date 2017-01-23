import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
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
                
                let local = localStorage.getItem(urlPrefix);
                if (local) {
                    observer.next(JSON.parse(local));
                    observer.complete();
                } else {
                    this.http
                        .get(this.edmundsDefaults.api_base + urlPrefix, {search: this.searchParams(params)})
                        .subscribe((response) => {
                            localStorage.setItem(urlPrefix, JSON.stringify(response.json()));
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
                makes: `makes`,
                style: `styles/${keys.id}`,
                styles: `${keys.makeNiceName}/${keys.modelNiceName}/${keys.year}/styles`
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
