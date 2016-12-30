import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataEdmundsService {

  private edmundsKey: string;

  constructor(private http: Http) {
    this.edmundsKey = 'z6d9yj4dkf8kjmn46gttx7mv';
  }

  public getEdmundsAllMakes = (): Observable<any> => {
    return this.http
      .get(`https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=${this.edmundsKey}`)
      .map((response) => response.json());
  }
}
