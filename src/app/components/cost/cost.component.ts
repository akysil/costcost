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
    
    public preferences: EventEmitter<any> = new EventEmitter();
    public cars: EventEmitter<any> = new EventEmitter();
    public data: Observable<any>;
    
    constructor(private carService: CostCarService,
        private costScoreService: CostScoreService,
        private preferencesService: PreferencesService) {
        
    }
    
    ngOnInit() {
        this.data = this.cars
            .mergeMap(this.carService.getProperties)
            .mergeMap(this.costScoreService.get)
            .combineLatest(this.preferences)
            .mergeMap(this.preferencesService.apply);
        
        // this.data.subscribe((data: any) => console.log(data));
    }
}
