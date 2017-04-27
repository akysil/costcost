import _u from '../cost-utilities.service';
import { Observable } from 'rxjs/Observable';

export default class CostScoreComfortService {
    
    static get(props: any[]): Observable<number[]> {
    
        return Observable.from(props)
            .mergeMap(CostScoreComfortService.normalize$)
            .toArray()
            .mergeMap(_u.percents$);
    }
    
    static normalize$(prop: any) {
    
        return Observable.of(prop)
            .mergeMap(CostScoreComfortService.normalizeSeatUpholstery$)
            .mergeMap(CostScoreComfortService.normalizeSteeringWheelTrim$)
            .mergeMap(CostScoreComfortService.normalizeLegRoom$);
    }
    
    static normalizeSeatUpholstery$(prop: any) {
        
        const upholstery = [
            'LEATHERETTE',
            'LEATHER'
        ];
        
        return Observable.of(prop)
            .map(({seatUpholstery}: any) => ({
                ...prop,
                seatUpholstery: (upholstery.indexOf(seatUpholstery.toUpperCase()) + 1) || null
            }));
    }
    
    static normalizeSteeringWheelTrim$(prop: any) {
    
        const trim = [
            'LEATHER'
        ];
        
        return Observable.of(prop)
            .map(({steeringWheelTrim}: any) => ({
                ...prop,
                steeringWheelTrim: (trim.indexOf(steeringWheelTrim.toUpperCase()) + 1) || null
            }));
    }
    
    static normalizeLegRoom$(prop: any) {
        return Observable.of(prop)
            .map(({legRoom}: any) => ({...prop, legRoom: _u.sum(legRoom)}));
    }
}
