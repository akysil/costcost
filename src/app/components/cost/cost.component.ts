import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PropertiesService } from '../../services/properties.service';
import { ScoresService } from '../../services/cost-scores.service';
import { Observable } from 'rxjs';
import { PreferencesService } from '../../services/preferences.service';
import { ScoreService } from '../../services/score.service';
import { Car } from '../../interfaces/car.interface';

import _u from '../../services/cost-utilities.service';

@Component({
    selector: 'cost',
    templateUrl: './cost.component.html',
    styleUrls: ['./cost.component.scss'],
    providers: [PreferencesService, ScoreService]
})
export class CostComponent implements OnInit {
    public preferences: EventEmitter<any> = new EventEmitter();
    // TODO: rename credentials to cars
    public credentials: EventEmitter<Car[]> = new EventEmitter();
    public cars: Observable<any>;
    
    constructor(
        private propertiesService: PropertiesService,
        private scoresService: ScoresService,
        private preferencesService: PreferencesService,
        private scoreService: ScoreService) {
        
    }
    
    ngOnInit() {
        this.cars = this.credentials
            .mergeMap(this.propertiesService.apply)
            .mergeMap(this.scoresService.apply)
            .combineLatest(this.preferences)
            .mergeMap(this.preferencesService.apply)
            .mergeMap(this.scoreService.apply);
    
        //this.credentials
        //    .mergeMap(this.propertiesService.apply)
        //    .subscribe((cars: any) => console.log(_u.stringify(cars, null, 4)));
    }
}
