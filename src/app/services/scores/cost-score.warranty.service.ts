import _u from '../cost-utilities.service';
import { Observable } from 'rxjs/Observable';

export default class CostScoreWarrantyService {
    
    static get(props: any[]) {
        const propsKeys = props.map(_u.keys);
        const countableKeys: string[] = _u.intersection.apply(null, propsKeys);
        const uncountableRates: number[] = propsKeys.map(({length}: string[]) => length / countableKeys.length);
        
        return Observable.from(countableKeys)
            .map(pickKeyData)
            .mergeMap(CostScoreWarrantyService.scoreProperty)
            .reduce(_u.zipWithAdd, _u.fill(Array(props.length), 0)) // sum all props
            .map(applyUncountable)
            .mergeMap(_u.percents$);
        
        function pickKeyData(key: string) {
            return props.map((prop: any) => prop[key]);
        }
        
        function applyUncountable(scores: number[]) {
            return scores.map((s: number, i: number) => s * uncountableRates[i]);
        }
    }
    
    static scoreProperty(values: any[]) {
        return Observable.of(values)
            .mergeMap(CostScoreWarrantyService.normalize)
            .mergeMap(_u.percents$);
    }
    
    static normalize(values: any) {
        return Observable.from(values)
            .map(({mileage, years}: any) => {
                return {
                    mileage: (mileage === 'unlimited') ? 15000 * 15 : Number(mileage),
                    years: (years === 'unlimited') ? 15 : Number(years)
                };
            })
            .toArray();
    }
}
