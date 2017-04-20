import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CostCarService } from '../../services/cost-car.service';
import { CostScoreService } from '../../services/cost-score.service';
import { Observable } from 'rxjs';
import _u from '../../services/cost-utilities.service';

@Component({
    selector: 'cost',
    templateUrl: './cost.component.html',
    styleUrls: ['./cost.component.scss']
})
export class CostComponent implements OnInit {
    
    public dataIn: EventEmitter<any> = new EventEmitter();
    public dataOut: Observable<any>;
    
    constructor(private carService: CostCarService,
        private costScoreService: CostScoreService) {
    
    }
    
    ngOnInit() {
        this.dataOut = this.dataIn
            .mergeMap(this.carService.convertCredentialsToCars)
            .mergeMap(this.carService.getProperties)
            .mergeMap(this.costScoreService.getScore)
            .scan(_u.assign)
            // .distinctUntilChanged(null, _u.stringify) TODO: consider _u. isEqual
            .map((x: any) => {
                console.log(_u.stringify(x, null, 4));
                return x;
            })
            ;
    }
}
