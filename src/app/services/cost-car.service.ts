import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EdmundsService } from './edmunds.service';
import _u from './cost-utilities.service';
import { CostCascadeValue } from '../interfaces/cost-cascade-form.interface';
import { CostCarOptions } from '../interfaces/cost-car-options.interface';

@Injectable()
export class CostCarService {
    
    constructor(private data: EdmundsService) {
        //
    }
    
    get getProperties() {
        return (data: any) => _u.get(data, 'cars.length') ?
            Observable.from(data.cars)
                .mergeMap(this.getOptions)
                .toArray()
                .map((cars: any) => ({...data, cars})) :
            Observable.of(data);
    }
    
    get getOptions() {
        return (car: any): Observable<any> => {
            
            const {state, styleId, zip} = <CostCascadeValue>_u.get(car, 'credentials', {});
            
            return (state && styleId && zip) ? Observable.merge(
                    this.getRating(styleId),
                    this.getTMV(state, styleId, zip),
                    this.getTCO(state, styleId, zip),
                    this.getWarranty(styleId),
                    this.getEngine(styleId),
                    this.getTransmission(styleId),
                    this.getOffRoad(styleId),
                    this.getRoominess(styleId),
                    this.getComfort(styleId),
                    this.getSafety(styleId)
                )
                .reduce(_u.assign)
                .map((properties: any) => ({properties, ...car})) :
                Observable.of(car);
        };
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
            return Observable.of();
        };
    }
    
    get getTCO() {
        return (state: string, styleId: string, zip: string): Observable<CostCarOptions> => {
            if (state === 'new') {
                return this.data.get('tco', {styleId, zip})
                    .map(({value}: any) => ({tco: value}));
            }
            return Observable.of();
        };
    }
    
    get getWarranty() {
        return (styleId: string): Observable<CostCarOptions> => {
            return this.data.get('equipment', {styleId})
                .map(composeWarranty);
            
            function composeWarranty({equipment}: any): CostCarOptions {
                const warrantiesArray = equipment.filter(({equipmentType}: any) => equipmentType === 'WARRANTY');
                return {
                    warranty: warrantiesArray.reduce((warranty: any, {attributes}: any) => {
                        const type = findInAttributes('Warranty Type').toLowerCase().replace(' ', '_');
                        const mileage = findInAttributes('Warranty Maximum Mileage') || 'unlimited';
                        const years = findInAttributes('Warranty Maximum Years') || 'unlimited';
                        return {...{[type]: {mileage, years}}, ...warranty};
                        
                        function findInAttributes(query: string) {
                            return Object(_u.findInCollection(attributes, 'name', query)).value;
                        }
                    }, {})
                };
            }
        }
    }
    
    get getEngine() {
        return (styleId: string): Observable<any> => {
            return this.data.get('equipment', {styleId}, {availability: 'standard'})
                .map(composeEngine);
            
            function composeEngine({equipment}: any): CostCarOptions {
                const horsepower = Number(findInEngine('horsepower'));
                const torque = Number(findInEngine('torque'));
                const weight = Number(findInEquipment('Specifications', 'Tco Curb Weight'));
                
                return {
                    engine: {
                        horsepowerToWeight: Math.round(horsepower / weight * 100000),
                        torqueToWeight: Math.round(torque / weight * 100000),
                        rpm: findInEngine('rpm'),
                        type: findInEngine('type')
                    }
                };
                
                function findInEngine(query: string) {
                    return _u.findInCollection(equipment, 'equipmentType', 'ENGINE')[query];
                }
                
                function findInEquipment(name: string, attrName?: string) {
                    return _u.findInEquipment(equipment, name, attrName);
                }
            }
        }
    }
    
    get getTransmission() {
        return (styleId: string): Observable<CostCarOptions> => {
            return this.data.get('equipment', {styleId}, {availability: 'standard'})
                .map(composeTransmission);
            
            function composeTransmission({equipment}: any): CostCarOptions {
                
                return {
                    transmission: {
                        type: findInTransmission('transmissionType'),
                        numberOfSpeeds: Number(findInTransmission('numberOfSpeeds'))
                    }
                };
                
                function findInTransmission(query: string) {
                    return _u.findInCollection(equipment, 'equipmentType', 'TRANSMISSION')[query];
                }
            }
        }
    }
    
    get getOffRoad() {
        return (styleId: string): Observable<CostCarOptions> => {
            return this.data.get('equipment', {styleId}, {availability: 'standard'})
                .map(composeOffRoad);
            
            function composeOffRoad({equipment}: any): CostCarOptions {
                
                const driveType = findInEquipment('Drive Type', 'Driven Wheels');
                const groundClearance = Number(findInEquipment('Exterior Dimensions', 'Minimum Ground Clearance'));
                
                return {
                    offRoad: {
                        driveType,
                        groundClearance
                    }
                };
                
                function findInEquipment(name: string, attrName?: string) {
                    return _u.findInEquipment(equipment, name, attrName);
                }
            }
        }
    }
    
    get getRoominess() {
        return (styleId: string): Observable<CostCarOptions> => {
            return this.data.get('equipment', {styleId}, {availability: 'standard'})
                .map(composeRoominess);
            
            function composeRoominess({equipment}: any): CostCarOptions {
                
                const cargoCapacity = Number(findInEquipment('Cargo Dimensions', 'Cargo Capacity, All Seats In Place'));
                const doorsNumber = Number(findInEquipment('Doors', 'Number Of Doors'));
                const seatsNumber = findInEquipment('Seating Configuration').attributes
                    .filter(({name}: any) => name.match(/Row Seating Capacity/i))
                    .reduce((seats: number, item: any) => {
                        return seats + Number(item.value);
                    }, 0);
                
                return {
                    roominess: {
                        cargoCapacity,
                        doorsNumber,
                        seatsNumber
                    }
                };
                
                function findInEquipment(name: string, attrName?: string) {
                    return _u.findInEquipment(equipment, name, attrName);
                }
            }
        }
    }
    
    get getComfort() {
        return (styleId: string): Observable<CostCarOptions> => {
            return this.data.get('equipment', {styleId}, {availability: 'standard'})
                .map(composeComfort);
            
            function composeComfort({equipment}: any): CostCarOptions {
                
                const seatUpholstery = findInEquipment('1st Row Seats', '1st Row Upholstery');
                const steeringWheelTrim = findInEquipment('Steering Wheel', 'Steering Wheel Trim');
                const legRoom = [
                    Number(findInEquipment('Interior Dimensions', '1st Row Leg Room')),
                    Number(findInEquipment('Interior Dimensions', '2nd Row Leg Room'))
                ];
                
                return {
                    comfort: {
                        seatUpholstery,
                        steeringWheelTrim,
                        legRoom
                    }
                };
                
                function findInEquipment(name: string, attrName?: string) {
                    return _u.findInEquipment(equipment, name, attrName);
                }
            }
        }
    }
    
    get getSafety() {
        return (styleId: string): Observable<CostCarOptions> => {
            return this.data.get('safety', {styleId})
                .map(composeSafety);
            
            function composeSafety(data: any): CostCarOptions {
                return (data.nhtsa) ? {safety: {nhtsa: Number(data.nhtsa.overall)}} : null;
            }
        }
    }
    
}
