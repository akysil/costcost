import { Component, EventEmitter, Output } from '@angular/core';
import { CostCar } from '../../classes/cost-car.class';
import { CostCarService } from '../../services/cost-car.service';
import { CostScoreService } from '../../services/cost-score.service';

@Component({
    selector: 'cost',
    templateUrl: './cost.component.html',
    styleUrls: ['./cost.component.scss']
})
export class CostComponent {
    
    constructor(private costCarService: CostCarService, private costScoreService: CostScoreService) {
    }
    
    public cars: any[] = [];
    
    public applyScore = () => {
        this.cars = [...this.costScoreService.setScore(this.cars)];
    };
    
    add() {
        this.cars = (this.cars.length < 5) ?
            [...this.cars, new CostCar(this.costCarService, this.applyScore)] :
            this.cars;
    }
    
    remove(carToRemove: any) {
        this.cars = this.cars.filter((car: any) => car != carToRemove);
    }
}
