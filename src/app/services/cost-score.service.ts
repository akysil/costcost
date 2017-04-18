import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import _u from './cost-utilities.service';

@Injectable()
export class CostScoreService {
    
    constructor() {
    }
    
    private get _readyForScore() {
        return (cars: any) => {
            return _u.isArray(cars) && _u.filter(cars, 'properties').length > 1;
        };
    }
    
    public get getScore() {
        return (data: any) => (this._readyForScore(data.cars)) ?
            Observable.of(data)
                .mergeMap((data: any) => this._setScore(data.cars))
                .map((cars: any[]) => _u.set(data, 'cars', cars)) :
            Observable.of(data);
    }
    
    private get _setScore() {
        return (cars: any[]) => {
            return Observable.of(cars)
                .mergeMap(this._propertyValues)
                .mergeMap(this._propertyScores)
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
    
    private get _propertyValues() {
        return (cars: any) => Observable.from(cars)
            .pluck('properties')
            .mergeMap(_u.keys$)
            .distinct()
            .map((key: string) => {
                return {
                    key,
                    value: cars.map(({properties}: any) =>
                        (properties) ? properties[key] || 'NOT_AVAILABLE' : 'NOT_READY')
                }
            });
    }
    
    private get _propertyScores() {
        return ({key, value}: any) => {
            return Observable.of({key, value: _u.fill(value, 0)});
        };
    }
    
    private _tco(props: number[]) {
        return this._simpleNumbers(props);
    }
    
    private _tmv(props: number[]) {
        return this._simpleNumbers(props);
    }
    
    private _simpleNumbers(props: number[]) {
        const percent = _u.sum(props) / 100;
        return props.map((prop: any) => 100 - _u.round(prop / percent));
    }
}
