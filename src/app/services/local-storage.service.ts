import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {DataEdmundsService} from './data-edmunds.service';

@Injectable()
export class LocalStorageService {
  
  constructor(private dataEdmunds: DataEdmundsService) {
  }
  
  public getEdmundsAllMakes = (): Observable<any> => {
    
    return new Observable((observer: any) => {
      
      let edmundsAllMakes = localStorage.getItem('edmundsAllMakes');
      
      if (edmundsAllMakes) {
        observer.next(JSON.parse(edmundsAllMakes));
        observer.complete();
      } else {
        this.dataEdmunds.getEdmundsAllMakes().subscribe(data => {
          localStorage.setItem('edmundsAllMakes', JSON.stringify(data));
          observer.next(data);
          observer.complete();
        });
      }
    });
  }
}
