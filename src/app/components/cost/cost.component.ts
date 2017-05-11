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
    public credentials: EventEmitter<any> = new EventEmitter();
    public cars: Observable<any>;
    
    constructor(private carService: CostCarService,
        private costScoreService: CostScoreService,
        private preferencesService: PreferencesService) {
        
    }
    
    ngOnInit() {
        this.cars = this.credentials
            .mergeMap(this.carService.getProperties)
            .mergeMap(this.costScoreService.get)
            .combineLatest(this.preferences)
            .mergeMap(this.preferencesService.apply);
        
        // this.cars.subscribe((cars: any) => console.log(cars));
    }
}
