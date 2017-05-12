import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import _u from './cost-utilities.service';

@Injectable()
export class ScoreService {
    
    public get apply() {
        return (cars: any[]) => {
            return Observable.from(cars)
                .pluck('scores')
                .mergeMap(_u.sumProperties$)
                .toArray()
                .map((scores: number[]) =>
                    _u.map(cars, (car: any, i: number) =>
                        _u.set(car, 'score', scores[i])));
        };
    }
}
