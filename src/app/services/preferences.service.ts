import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import _u from './cost-utilities.service';

@Injectable()
export class PreferencesService {
    
    constructor() {
    }
    
    public get apply() {
        return ([cars, preferences]: any[]) => {
            return (preferences && cars && _u.every(cars, 'scores')) ?
                Observable.from(cars)
                    .mergeMap(({scores, ...rest}: any) => {
                        return Observable.from(_u.toPairs(preferences))
                            .mergeMap(([preference, rate]: any[]) => {
                                return Observable.of(scores)
                                    .map((scores) => _u.pick(scores, this._keys(preference)))
                                    .map((scores) => _u.mapValues(scores, (value: number) => value * rate));
                            })
                            .reduce(_u.assign)
                            .map((newScores: any) => ({scores: {...scores, ...newScores}, ...rest}));
                    })
                    .toArray() :
                Observable.empty();
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
