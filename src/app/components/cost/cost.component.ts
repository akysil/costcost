import { Component, EventEmitter, Output } from '@angular/core';
import { CostCar } from '../../classes/cost-car.class';
import { CostCarService } from '../../services/cost-car.service';

@Component({
    selector: 'cost',
    templateUrl: './cost.component.html',
    styleUrls: ['./cost.component.scss']
})
export class CostComponent {
    
    constructor(private costCarService: CostCarService) {
    }
    
    someValue: any = {
        init: null
    };
    
    cars: any[] = [];
    
    //get add() {
    //    return () => (this.cars.length < 5) &&
    //    this.cars.push({});
    //}
    
    get add() {
        return () => (this.cars.length < 5) &&
        this.cars.push(new CostCar(this.costCarService));
    }
    
    get delete() {
        return (carToDelete: any) =>
            this.cars = this.cars.filter((car: any) => car != carToDelete);
    }
    
    scoring(e: any) {
        console.log(e);
    }
}
