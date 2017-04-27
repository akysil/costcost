import _u from '../cost-utilities.service';
import { Observable } from 'rxjs/Observable';

export default class CostScoreRoominessService {
    
    static get(props: any[]): Observable<number[]> {
        return Observable.of(props)
            .mergeMap(_u.percents$);
    }
}
