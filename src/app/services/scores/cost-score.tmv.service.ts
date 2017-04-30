import _u from '../cost-utilities.service';
import { Observable } from 'rxjs/Observable';

export default class CostScoreTmvService {
    
    static get(props: any[]): Observable<number[]> {
        
        return Observable.of(props)
            .mergeMap(_u.percents$)
            .mergeMap(_u.invertPercents$);
    }
}
