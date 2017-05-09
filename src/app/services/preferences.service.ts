import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import _u from './cost-utilities.service';

@Injectable()
export class PreferencesService {
    
    constructor() {
    }
    
    public get apply() {
        return ([all, preferences]: any[]) => {
            
            let {cars} = all;
    
            // console.log(preferences);
            
            return (preferences && cars && _u.every(cars, 'scores')) ?
                Observable.from(cars)
                    .mergeMap(({scores, ...rest}: any) => {
                        return Observable.from(_u.toPairs(preferences))
                            .mergeMap(([preference, rate]: any[]) => {
                                // console.log(preference, rate);
                                return Observable.of(scores)
                                    .map((scores) => _u.pick(scores, this._keys(preference)))
                                    .map((scores) => _u.mapValues(scores, (value: number) => value * rate));
                            })
                            .reduce(_u.assign)
                            .map((newScores: any) => ({scores: {...scores, ...newScores}, ...rest}));
                    })
                    .toArray() :
                Observable.of([null]);
        };
    }
    
    private get _keys() {
        return (key: string) => {
            const keys = {
                performance: ['engine', 'transmission', 'offRoad'],
                prestige: ['roominess', 'comfort', 'safety'],
                price: ['tco', 'tmv', 'warranty']
            };
            return keys[key] || [];
        };
    }
    
}
