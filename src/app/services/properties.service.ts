import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EdmundsService } from './edmunds.service';
import {
    CostCarOptions,
    CostCarOptionsComfort,
    CostCarOptionsEngine,
    CostCarOptionsOffRoad,
    CostCarOptionsRoominess,
    CostCarOptionsSafety,
    CostCarOptionsTransmission,
    CostCarOptionsWarranty
} from '../interfaces/cost-car-options.interface';
import { Car } from '../interfaces/car.interface';

import _u from './cost-utilities.service';

@Injectable()
export class PropertiesService {
    
    properties: any[] = [
        {name: 'rating', query: 'rating'},
        {name: 'tmv', query: 'tmv'},
        {name: 'tco', query: 'tco'},
        {name: 'warranty', query: 'equipment'},
        {name: 'engine', query: 'equipment'},
        {name: 'transmission', query: 'equipment'},
        {name: 'offRoad', query: 'equipment'},
        {name: 'roominess', query: 'equipment'},
        {name: 'comfort', query: 'equipment'},
        {name: 'safety', query: 'safety'}
    ];
    
    constructor(private edmundsService: EdmundsService) {
    }
    
    get apply() {
        
        return (cars: Car[]) => Boolean(cars.length) ?
            Observable.from(cars)
                .mergeMap(this.setProperties$)
                .toArray() :
            Observable.of(cars);
    }
    
    get setProperties$() {
        return ({credentials, ...rest}: Car): Observable<any> => {
            
            const {state, styleId, zip} = credentials;
            
            if (!state || !styleId || !zip) {
                return Observable.of({credentials, ...rest});
            }
            
            const properties: Observable<CostCarOptions>[] = this.properties
                .map(({name, query}: any) => {
                    const picker = (this[`pick${_u.upperFirst(name)}`]) ||
                        ((): any => ({[name]: null}));
                    
                    return this.edmundsService
                        .get(query, credentials)
                        .map((data: any) => ({[name]: picker(data)}))
                        .catch(() => Observable.of({[name]: null}));
                });
    
            return Observable.merge.apply(this, properties)
                .reduce(_u.assign)
                .map((properties: any) => ({properties, credentials, ...rest}));
        };
    }
    
    get pickRating() {
        return (data: any) => ({consumer: Number(data.averageRating)});
    }
    
    get pickTmv() {
        return ({tmv: {offerPrice: tmv}}: any) => tmv;
    }
    
    get pickTco() {
        return ({value}: any) => value;
    }
    
    get pickWarranty() {
        return ({equipment}: any): CostCarOptionsWarranty => {
            const warrantiesArray = equipment.filter(({equipmentType}: any) => equipmentType === 'WARRANTY');
            return warrantiesArray.reduce((warranty: any, {attributes}: any) => {
                const type = findInAttributes('Warranty Type').toLowerCase().replace(' ', '_');
                const mileage = findInAttributes('Warranty Maximum Mileage') || 'unlimited';
                const years = findInAttributes('Warranty Maximum Years') || 'unlimited';
                return {...{[type]: {mileage, years}}, ...warranty};
                
                function findInAttributes(query: string) {
                    return Object(_u.findInCollection(attributes, 'name', query)).value;
                }
            }, {});
        }
    }
    
    get pickEngine() {
        return ({equipment}: any): CostCarOptionsEngine => {
            const horsepower = Number(findInEngine('horsepower'));
            const torque = Number(findInEngine('torque'));
            const weight = Number(findInEquipment('Specifications', 'Tco Curb Weight'));
            
            return {
                horsepowerToWeight: Math.round(horsepower / weight * 100000),
                torqueToWeight: Math.round(torque / weight * 100000),
                rpm: findInEngine('rpm'),
                type: findInEngine('type')
            };
            
            function findInEngine(query: string) {
                return _u.findInCollection(equipment, 'equipmentType', 'ENGINE')[query];
            }
            
            function findInEquipment(name: string, attrName?: string) {
                return _u.findInEquipment(equipment, name, attrName);
            }
        }
    }
    
    get pickTransmission() {
        return ({equipment}: any): CostCarOptionsTransmission => {
            
            return {
                type: findInTransmission('transmissionType'),
                numberOfSpeeds: Number(findInTransmission('numberOfSpeeds'))
            };
            
            function findInTransmission(query: string) {
                return _u.findInCollection(equipment, 'equipmentType', 'TRANSMISSION')[query];
            }
        }
    }
    
    get pickOffRoad() {
        return ({equipment}: any): CostCarOptionsOffRoad => {
            
            const driveType = findInEquipment('Drive Type', 'Driven Wheels');
            const groundClearance = Number(findInEquipment('Exterior Dimensions', 'Minimum Ground Clearance'));
            
            return {
                driveType,
                groundClearance
            };
            
            function findInEquipment(name: string, attrName?: string) {
                return _u.findInEquipment(equipment, name, attrName);
            }
        }
    }
    
    get pickRoominess() {
        return ({equipment}: any): CostCarOptionsRoominess => {
            
            const cargoCapacity = Number(findInEquipment('Cargo Dimensions', 'Cargo Capacity, All Seats In Place'));
            const doorsNumber = Number(findInEquipment('Doors', 'Number Of Doors'));
            const seatsNumber = findInEquipment('Seating Configuration').attributes
                .filter(({name}: any) => name.match(/Row Seating Capacity/i))
                .reduce((seats: number, item: any) => {
                    return seats + Number(item.value);
                }, 0);
            
            return {
                cargoCapacity,
                doorsNumber,
                seatsNumber
            };
            
            function findInEquipment(name: string, attrName?: string) {
                return _u.findInEquipment(equipment, name, attrName);
            }
        }
    }
    
    get pickComfort() {
        return ({equipment}: any): CostCarOptionsComfort => {
            
            const seatUpholstery = findInEquipment('1st Row Seats', '1st Row Upholstery');
            const steeringWheelTrim = findInEquipment('Steering Wheel', 'Steering Wheel Trim');
            const legRoom = [
                Number(findInEquipment('Interior Dimensions', '1st Row Leg Room')),
                Number(findInEquipment('Interior Dimensions', '2nd Row Leg Room'))
            ];
            
            return {
                seatUpholstery,
                steeringWheelTrim,
                legRoom
            };
            
            function findInEquipment(name: string, attrName?: string) {
                return _u.findInEquipment(equipment, name, attrName);
            }
        }
    }
    
    get pickSafety() {
        return (data: any): CostCarOptionsSafety => {
            return {
                nhtsa: Number(_u.get(data, 'nhtsa.overall')) || null,
                iihs: _u.get(data, 'iihs') || null
            };
        }
    }
    
}
