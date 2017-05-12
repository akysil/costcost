import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import _u from './cost-utilities.service';
import scoresServices from './scores/index';

@Injectable()
export class CostScoresService {
    
    constructor() {
    }
    
    public get get() {
        return (cars: any) =>
            ((_u.get(cars, 'length') > 1) && _u.every(cars, 'properties')) ?
                Observable.of(cars)
                    .mergeMap(this._set) :
                Observable.of(cars);
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
                }, cars)
                .mergeMap(this._computeRawScore);
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
                        (properties) ? properties[key] || 'NOT_AVAILABLE' : 'NOT_READY')
                }
            });
    }
    
    private get _computeScores() {
        return ({key, values}: any) => {
            
            let score: Observable<number[]>;
            let scoreFn$: (values: any[]) => Observable<number[]> =
                _u.get(scoresServices, 'CostScore' + _u.upperFirst(key) + 'Service.get');
    
            if (_u.some(values, (value: any) => value === 'NOT_AVAILABLE')) {
                score = Observable.of(_u.fill(values, 0));
            } else if (scoreFn$) {
                score = scoreFn$(values);
            } else if (_u.every(values, _u.isQualifiedProperty)) {
                score = Observable.of(values);
            } else {
                score = Observable.of(_u.fill(values, 0));  // TODO: return Observable.error
            }
            
            return score
                .mergeMap(_u.percents$)
                .map((value: any[]) => ({key, value}));
        };
    }
    
    private get _computeRawScore() {
        return (cars: any) => {
            return Observable.from(cars)
                .pluck('scores')
                .toArray()
                .mergeMap(_u.percents$)
                .map((rawScores: number[]) =>
                    _u.map(cars, (car: any, i: number) =>
                        _u.set(car, 'rawScore', rawScores[i])));
        };
    }
}
