import _u from '../cost-utilities.service';
import { Observable } from 'rxjs/Observable';

export default class CostScoreEngineService {
    
    static get(props: any[]): Observable<number[]> {
        
        const h$ = Observable.from(props).pluck('horsepowerToWeight');
        const t$ = Observable.from(props).pluck('torqueToWeight');
        
        return Observable.zip(h$, t$, (h: number, t: number) =>
                ({horsepowerToWeight: h, torqueToWeight: t}))
            .toArray()
            .mergeMap(_u.percents$);
    }
}
