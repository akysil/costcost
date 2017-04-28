import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import _u from './cost-utilities.service';
import scoreServices from './scores/index';

@Injectable()
export class CostScoreService {
    
    constructor() {
    }
    
    public get get() {
        return (data: any) =>
            ((_u.get(data, 'cars.length') > 1) && _u.every(data.cars, 'properties')) ?
                Observable.of(data.cars)
                    .mergeMap(this._set)
                    .map(_u.set.bind(null, data, 'cars')) :
                Observable.of(data);
    }
    
    private get _set() {
        return (cars: any[]) => {
            return Observable.of(cars)
                .mergeMap(this._composeValues)
                .mergeMap(this._computeScores)
                .scan((cars: any, {key, value}: any) => {
                    return cars.map((car: any, index: number) => {
                        return _u.set(car, 'scores', {
                            ...car.scores,
                            ...{[key]: value[index]}
                        });
                    });
                }, cars);
        };
    }
    
    private get _composeValues() {
        return (cars: any) => Observable.from(cars)
            .pluck('properties')
            .mergeMap(_u.keys$)
            .distinct()
            .map((key: string) => {
                return {
                    key,
                    values: cars.map(({properties}: any) =>
                        (properties) ? properties[key] || null : 'NOT_READY')
                }
            });
    }
    
    private get _computeScores() {
        return ({key, values}: any) => {
            
            let score: Observable<number[]>;
            let scoreFn: (values: any[]) => Observable<number[]> =
                _u.get(scoreServices, 'CostScore' + _u.upperFirst(key) + 'Service.get');
    
            if (_u.some(values, _u.isNull)) {
                score = Observable.of(_u.fill(values, 0));
            } else if (scoreFn) {
                score = scoreFn(values);
            } else if (_u.every(values, _u.isNumber)) { // TODO: isQualifiedProperty
                score = Observable.of(values);
            } else {
                score = Observable.of(_u.fill(values, 0));  // TODO: return Observable.error
            }
            
            return score
                .mergeMap(_u.percents$)
                .map((value: any[]) => ({key, value}));
        };
    }
}
