import { Injectable } from '@angular/core';
import { URLSearchParams, RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { EdmundsDefaultsService } from './edmunds-defaults.service';

import _u from './cost-utilities.service';

@Injectable()
export class EdmundsService {
    
    constructor(private http: HttpService,
        private edmundsDefaults: EdmundsDefaultsService) {
    }
    
    get get() {
        return (query: string, options?: any, params?: any): Observable<any> => {
            return this.http.request(new Request(new RequestOptions({
                method: RequestMethod.Get,
                url: this.makeUrl(query, options),
                search: new URLSearchParams(_u.toParams({...this.edmundsDefaults.params, ...params}))
            })));
        }
    }
    
    get makeUrl() {
        return (query: string, options: any = {}) => {
            return this.edmundsDefaults.api_base + {
                    makes: `api/vehicle/v2/makes`,
                    style: `api/vehicle/v2/styles/${options.id}`,
                    styles: `api/vehicle/v2/${options.makeNiceName}/${options.modelNiceName}/${options.year}/styles`,
                    equipment: `api/vehicle/v2/styles/${options.styleId}/equipment`,
                    rating: `api/vehiclereviews/v2/styles/${options.id}`,
                    tmv: `v1/api/tmv/tmvservice/calculatenewtmv?styleid=${options.styleId}&zip=${options.zip}`,
                    tco: `v1/api/tco/newtruecosttoownbystyleidandzip/${options.styleId}/${options.zip}`,
                    safety: `api/vehicle/v2/styles/${options.styleId}/safety`
                }[query];
        };
    }
}