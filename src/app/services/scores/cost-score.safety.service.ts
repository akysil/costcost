import _u from '../cost-utilities.service';
import { Observable } from 'rxjs/Observable';

export default class CostScoreSafetyService {
    
    static get(props: any[]): Observable<number[]> {
        
        const nhtsa$ = Observable.from(props)
            .pluck('nhtsa')
            .toArray()
            .mergeMap(_u.percents$)
            .mergeMap(_u.flatten$);
        
        const iihs$ = Observable.from(props)
            .pluck('iihs')
            .toArray()
            .mergeMap(CostScoreSafetyService.pick$)
            .map(CostScoreSafetyService.normalize)
            .reduce(_u.zipWithAdd, _u.fill(Array(props.length), 0))
            .mergeMap(_u.percents$)
            .mergeMap(_u.flatten$);
        
        return Observable.zip(nhtsa$, iihs$)
            .map(([nhtsa, iihs]: any[]) => nhtsa + iihs)
            .toArray();
    }
    
    static pick$(iihs: any[]) {
        
        const intersections$ = _u.flatten$(iihs)
            .mergeMap((iihs: any[]) => _u.flatten$(iihs)
                .pluck('category')
                .toArray())
            .toArray()
            .map((iihs: any[]) => _u.intersection.apply(null, iihs))
            .mergeMap(_u.flatten$);
        
        const flattenIihs$ = _u.flatten$(iihs)
            .mergeMap((iihs: any[]) => _u.flatten$(iihs)
                .reduce((acc: any, {category, value}: any) => ({[category]: value, ...acc}), {}))
            .toArray();
    
        return intersections$.withLatestFrom(flattenIihs$)
            .map(([category, iihs]: any[]) => _u.map(iihs, category));
    }
    
    static normalize(props: string[]) {
        
        const score = {
            'Good': 4,
            'Acceptable': 3,
            'Marginal': 2,
            'Poor': 1
        };
    
        return props.map((prop: string) => score[prop] || 0);
    }
}
