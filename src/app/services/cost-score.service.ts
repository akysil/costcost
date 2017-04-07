import { Injectable } from '@angular/core';
import { CostCar } from '../classes/cost-car.class';
import { CostCarOptions } from '../interfaces/cost-car-options.interface';
import { Observable } from 'rxjs';
import { _u } from './cost-utilities.service';

@Injectable()
export class CostScoreService {
    
    constructor() {
    }
    
    private get _readyForScore() {
        return (cars: any) => {
            return _u.isArray(cars) && _u.filter(cars, 'properties').length > 1;
        };
    }
    
    private get _propertyKeys() {
        return (cars: any) => Observable.from(cars)
            .pluck('properties')
            .mergeMap(_u.keys$)
            .distinct();
    }
    
    private get _scoreData() {
        return (cars: any[]) => {
            return (key: string) => {
                return Observable.from(cars)
                    .map(({properties}: any) => (properties) ? properties[key] || 'NOT_AVAILABLE' : 'NOT_READY')
                    .toArray()
                    .map((properties: any[]) => ({[key]: properties}));
                
                // apply to cars
            };
        };
    }
    
    private get _computeScores() {
        return (scoreData: any) => {
            return Observable.from(_u.entries(scoreData))
                .mergeMap(this._computeScore)
                .reduce(_u.assign);
        };
    }
    
    private get _computeScore() {
        return ([key, data]: any[]) => {
            return Observable.of({[key]: _u.fill(data, 0)});
        };
    }
    
    private get _applyScores() {
        return (cars: any[]) => {
            return (scores: any) => {
                return cars.map((car: any, i: number) => {
                    return _u.set(car, 'scores', _u.mapValues(scores, (property: any[]) => property[i]));
                });
            };
        };
    }
    
    public get setScore2() {
        
        return (data: any) => (this._readyForScore(data.cars)) ?
            Observable.of(data.cars)
                .mergeMap(this._propertyKeys)
                .mergeMap(this._scoreData(data.cars))
                .reduce(_u.assign)
                .mergeMap(this._computeScores)
                .map(this._applyScores(data.cars))
                .map((cars: any) => {
                    return {...data, cars};
                }) :
            Observable.of(data);
    }
    
    public setScore(cars: CostCar[]) {
        
        let _this = this;
        
        return (cars.length > 1) ? score(cars) : cars;
        
        function score(cars: CostCar[]) {
            
            const scores = totalScore(cars);
            
            return cars.map((car: CostCar, index: number) => {
                car.score = scores[index];
                return car;
            });
        }
        
        function totalScore(cars: CostCar[]) {
            
            return propertiesScore(cars.map((car: CostCar) => car.properties))
                .map((propertiesWithScores: any) => {
                    return Object.keys(propertiesWithScores)
                        .reduce((sum: number, key: string) => {
                            return sum + propertiesWithScores[key];
                        }, 0);
                });
        }
        
        function propertiesScore(inputProps: CostCarOptions[]) {
            
            const keys = Object.keys(inputProps[0]);
            
            return keys.reduce((outputProps: any, key: string) => {
                
                if (_this[`_${key}`]) {
                    _this[`_${key}`](inputProps.map((properties: CostCarOptions) => properties[key]))
                        .map((score: number, index: number) => {
                            if (!outputProps[index]) outputProps[index] = {};
                            outputProps[index][key] = score;
                        });
                }
                
                // TODO: Error when no comparator function
                
                return outputProps;
            }, []);
        }
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
