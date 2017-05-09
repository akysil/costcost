import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CostCarService } from '../../services/cost-car.service';
import { CostScoreService } from '../../services/cost-score.service';
import { Observable } from 'rxjs';
import _u from '../../services/cost-utilities.service';
import { PreferencesService } from '../../services/preferences.service';

@Component({
    selector: 'cost',
    templateUrl: './cost.component.html',
    styleUrls: ['./cost.component.scss'],
    providers: [PreferencesService]
})
export class CostComponent implements OnInit {
    
    public dataIn: EventEmitter<any> = new EventEmitter();
    public preferences: EventEmitter<any> = new EventEmitter();
    public dataOut: Observable<any>;
    
    constructor(private carService: CostCarService,
        private costScoreService: CostScoreService,
        private preferencesService: PreferencesService) {
        
    }
    
    ngOnInit() {
        this.dataOut = this.dataIn
            .scan(_u.assign)
            .mergeMap(this.carService.getProperties)
            .mergeMap(this.costScoreService.get)
            // .distinctUntilChanged(null, _u.stringify) TODO: consider _u. isEqual
            .map((x: any) => {
                // console.log(_u.stringify(x, null, 4));
                return x;
            });
        
        // this.preferences.subscribe((data: any) => console.log(data));
        
        let test = this.dataOut.withLatestFrom(this.preferences)
            .mergeMap(this.preferencesService.apply);
        test.subscribe((data: any) => console.log(data));
    }
}
