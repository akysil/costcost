import { Injectable } from '@angular/core';
import { URLSearchParams, RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { EdmundsDefaultsService } from './edmunds-defaults.service';

import _u from './cost-utilities.service';

export type EdmundsQueryName = 'makes' | 'style' | 'styles' | 'equipment' | 'rating' | 'tmv' | 'tco' | 'safety';

export interface EdmundsQueryOptions {
    makeNiceName?: string;
    modelNiceName?: string;
    styleId?: string;
    year?: string;
    zip?: string;
}

@Injectable()
export class EdmundsService {
    
    constructor(private http: HttpService,
        private edmundsDefaults: EdmundsDefaultsService) {
    }
    
    get get() {
        return (query: EdmundsQueryName, credentials?: EdmundsQueryOptions, params?: object): Observable<any> => {
            return this.http.request(new Request(new RequestOptions({
                method: RequestMethod.Get,
                url: this.makeUrl(query, credentials),
                search: new URLSearchParams(_u.toParams({...this.edmundsDefaults.params, ...params}))
            })));
        }
    }
    
    get makeUrl() {
        return (query: EdmundsQueryName, credentials: EdmundsQueryOptions = {}) => {
            return this.edmundsDefaults.api_base + {
                    makes: `api/vehicle/v2/makes`,
                    style: `api/vehicle/v2/styles/${credentials.styleId}`,
                    styles: `api/vehicle/v2/${credentials.makeNiceName}/${credentials.modelNiceName}/${credentials.year}/styles`,
                    equipment: `api/vehicle/v2/styles/${credentials.styleId}/equipment`,
                    rating: `api/vehiclereviews/v2/styles/${credentials.styleId}`,
                    tmv: `v1/api/tmv/tmvservice/calculatenewtmv?styleid=${credentials.styleId}&zip=${credentials.zip}`,
                    tco: `v1/api/tco/newtruecosttoownbystyleidandzip/${credentials.styleId}/${credentials.zip}`,
                    safety: `api/vehicle/v2/styles/${credentials.styleId}/safety`
                }[query];
        };
    }
}