import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { EdmundsService } from './edmunds.service';
import { DataHandlersService } from './data-handlers.service';

@Injectable()
export class DataService {
    
    private externalRequest = (query: string, options?: Object): Function | Error => {
        
        let list = {
            allMakes: this.edmundsService.get.bind(null, 'makes', options)
        };
        
        return list[query] || new Error(`Unrecognized Data query "${query}"!`);
    };
        
    constructor(private edmundsService: EdmundsService, private dataHandlers: DataHandlersService) {
        //
    }
    
    public get = (query: string, options: Object = {}): Observable<any> => {
    
        return Observable.create((observer: any) => {
        
            // TODO: placeholder for local DB
            let inDB: boolean = false;
        
            let source: Function | Error = (inDB) ?
                () => 'local DB method' :
                this.externalRequest(query, options);
            
            if (source instanceof Error) {
                observer.error(source);
                observer.complete();
            } else {
                source().subscribe(
                    (data: any) => {
                        observer.next(this.dataHandlers[query](data));
                        observer.complete();
                    }
                );
            }
        });
    };
}
