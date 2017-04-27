import _u from '../cost-utilities.service';
import { Observable } from 'rxjs/Observable';

export default class CostScoreOffRoadService {
    
    static get(props: any[]): Observable<number[]> {
        
        return Observable.from(props)
            .mergeMap(normalize$)
            .toArray()
            .mergeMap(_u.percents$);
        
        function normalize$(prop: any) {
            const types = [
                ['RWD', 'REAR'],
                ['FWD', 'FRONT'],
                ['AWD', 'ALL'],
                ['4WD', 'FOUR']
            ];
            
            return Observable.merge.apply(null, types.map((keys: any, index: number) => {
                    return Observable.from(keys)
                        .find((key: string) => prop.driveType.toUpperCase().includes(key))
                        .map((key: string) => (key) ? index + 1 : null)
                        .skipWhile((result: any) => !result);
                }))
                .map((driveType: number) => ({...prop, driveType}));
        }
    }
}
