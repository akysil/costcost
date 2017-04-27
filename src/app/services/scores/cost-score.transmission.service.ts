import _u from '../cost-utilities.service';
import { Observable } from 'rxjs/Observable';

export default class CostScoreTransmissionService {
    
    static get(props: any[]): Observable<number[]> {
    
        const speeds$ = Observable.from(props)
            .pluck('numberOfSpeeds')
            .toArray()
            .mergeMap(_u.percents$);
    
        const types$ = Observable.from(props)
            .pluck('type')
            .map((type: any) => String(type).toLowerCase());
    
        const auto$: Observable<boolean> = types$.every((type: any) => type.includes('auto'));
        const manual$: Observable<boolean> = types$.every((type: any) => type.includes('manual'));
    
        return Observable.zip(auto$, manual$)
            .mergeMap(([auto, manual]: boolean[]) =>
                (auto || manual) ? speeds$ : Observable.of(_u.fill(props, 0)));
    }
}
