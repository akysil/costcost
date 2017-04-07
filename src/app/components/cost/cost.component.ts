import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CostCar } from '../../classes/cost-car.class';
import { CostCarService } from '../../services/cost-car.service';
import { CostScoreService } from '../../services/cost-score.service';
import { Observable } from 'rxjs';
import { _u } from '../../services/cost-utilities.service';

@Component({
    selector: 'cost',
    templateUrl: './cost.component.html',
    styleUrls: ['./cost.component.scss']
})
export class CostComponent implements OnInit {
    
    public dataIn: EventEmitter<any> = new EventEmitter();
    public dataOut: Observable<any>;
    
    constructor(private costCarService: CostCarService,
        private costScoreService: CostScoreService) {
    
    }
    
    ngOnInit() {
        this.dataOut = this.dataIn
            .mergeMap(this.costCarService.setCars)
            .mergeMap(this.costCarService.setProperties)
            .scan(_u.assign)
            .mergeMap(this.costScoreService.setScore2)
            .distinctUntilChanged(null, _u.stringify)
            .startWith({});
    }
}
