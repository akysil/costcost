import { Injectable } from '@angular/core';
import { CostCar } from '../classes/cost-car.class';

@Injectable()
export class CostScoreService {
    
    constructor() {}
    
    public setScore(cars: CostCar[]) {
    
        return (cars.length > 1) ? cars.map(setScore) : cars;
    
        function setScore(car: CostCar) {
            car.score = (car.ready) ? Math.random() : 0;
            return car;
        }
    }
}
