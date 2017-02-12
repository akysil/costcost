import { Injectable } from '@angular/core';
import { CostCarOptions } from '../interfaces/cost-car-options.interface';
import { Observable } from 'rxjs';
import { EdmundsService } from './edmunds.service';
import { CostCascadeValue } from '../interfaces/cost-cascade-form.interface';

@Injectable()
export class CostCarService {
    
    constructor(private data: EdmundsService) {
        //
    }
    
    get getOptions() {
        return ({state, styleId, zip}: CostCascadeValue): Observable<CostCarOptions> => {
            console.log(styleId);
            return Observable.merge(
                this.getRating(styleId),
                this.getTMV(state, styleId, zip),
                this.getTCO(state, styleId, zip),
                this.getWarranty(styleId)
            );
        }
    }
    
    get getStyle() {
        return (id: string): Observable<any> => {
            return this.data.get('style', {id});
        }
    }
    
    get getRating() {
        return (id: string): Observable<CostCarOptions> => this.data.get('rating', {id})
            .map((data: any) => ({rating: {consumer: Number(data.averageRating)}}));
    }
    
    get getTMV() {
        return (state: string, styleId: string, zip: string): Observable<CostCarOptions> => {
            if (state === 'new') {
                return this.data.get('tmv', {styleId, zip})
                    .map(({tmv: {offerPrice: tmv}}: any) => ({tmv}));
            }
        };
    }
    
    get getTCO() {
        return (state: string, styleId: string, zip: string): Observable<CostCarOptions> => {
            if (state === 'new') {
                return this.data.get('tco', {styleId, zip})
                    .map(({value}: any) => ({tco: value}) );
            }
        };
    }
    
    get getWarranty() {
        return (styleId: string): Observable<CostCarOptions> => {
            return this.data.get('equipment', {styleId})
                .map(composeWarranty);
            
            function composeWarranty({equipment}: any): CostCarOptions {
                const warrantyArray = equipment.filter(({equipmentType}: any) => equipmentType === 'WARRANTY');
                return {
                    warranty: warrantyArray.reduce((warranties: any, {attributes}: any) => {
                        const type = findInCollection(attributes, 'Warranty Type').toLowerCase().replace(' ', '_');
                        const mileage = findInCollection(attributes, 'Warranty Maximum Mileage');
                        const years = findInCollection(attributes, 'Warranty Maximum Years');
                        let warranty = warranties[type] = {};
                        if (mileage) {
                            warranty['mileage'] = mileage;
                        }
                        if (years) {
                            warranty['years'] = years;
                        }
                        return warranties;
                    }, {})
                };
                
                function findInCollection(attributes: any, query: string) {
                    let filtered = attributes.filter(({name}: any) => name === query);
                    return (filtered.length) ? filtered[0].value : null;
                }
            }
        }
    }
}
