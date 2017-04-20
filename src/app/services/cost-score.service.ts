import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import _u from './cost-utilities.service';

@Injectable()
export class CostScoreService {
    
    constructor() {
    }
    
    public get getScore() {
        return (data: any) => (_u.filter(data.cars, 'properties').length > 1) ?
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
            return Observable.of({
                key,
                value: (this[`_${key}`]) ? this[`_${key}`](value) : _u.fill(value, 0)});
        };
    }
    
    private _tco(props: number[]) {
        return this._simpleNumbers(props);
    }
    
    private _tmv(props: number[]) {
        return this._simpleNumbers(props);
    }
    
    private _warranty(props: any[]) {
        // TODO:
        // 1. multiplier: number of car's warranties
        // 2. war. to war. ratio
        // 3. car to car ratio (by equivalent warranties)
        // 4. apply multiplier
        
        const res = Observable.from(_u.keys(_u.head(props)))
            .map((key: string) => {
                if(_u.every()) {
                    //
                }
            });
        
        return this._simpleNumbers(_u.map(props, () => Math.random()));
    }
    
    private _simpleNumbers(props: number[]) {
        const percent = _u.sum(props) / 100;
        return props.map((prop: any) => 100 - _u.round(prop / percent));
    }
}
