import { Component} from '@angular/core';

import { CostCar } from '../../classes/cost-car.class'
import { CostCarService } from '../../services/cost-car.service';

@Component({
    selector: 'cost-table',
    templateUrl: './cost-table.component.html',
    styleUrls: ['./cost-table.component.scss']
})
export class CostTableComponent {
    
    items: CostCar[] = [];
    
    constructor(private costCarService: CostCarService) {
    }
    
    get add() {
        return () =>
            this.items.push(new CostCar(this.costCarService));
    }
    
    get delete() {
        return (carToDelete: any) =>
            this.items = this.items.filter((car: any) => car != carToDelete);
    }
}
