import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { EdmundsDefaultsService } from './edmunds-defaults.service';

@Injectable()
export class EdmundsService {
    
    private queries: any = {
        makes: [],
        details: ['maker','model','year','trim']
    };
    
    constructor(private http: Http, private edmundsDefaults: EdmundsDefaultsService) {
        //
    }
    
    public get = (query: string, options: Object = {}, params: Object = {}): Observable<any> => {
        
        let urlPrefix: string | Error = this.urlPrefix(query, options);
        
        return (urlPrefix instanceof Error) ?
            Observable.throw(urlPrefix) :
            this.http
                .get(this.edmundsDefaults.api_base + urlPrefix, {search: this.searchParams(params)})
                .map((response) => response.json());
    };
    
    private urlPrefix = function (query: string, options: Object): string | Error {
        
        if (!this.queries[query]) {
            return new Error(`Unrecognized Edmunds query "${query}"!`);
        }
        
        let prefix = composePrefix(this.queries[query]);
        
        if (prefix.indexOf('undefined') > -1) {
            return new Error(`Missed options in Edmunds query "${query}"!`);
        }
        
        return prefix;
        
        function composePrefix(keys: Array<string>) {
            
            return (!keys.length) ? query :
                `${query}/${keys.map((key: string) => String(options[key])).join('/')}`;
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
