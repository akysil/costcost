import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CostCarService } from '../../services/cost-car.service';
import { CostScoresService } from '../../services/cost-scores.service';
import { Observable } from 'rxjs';
import { PreferencesService } from '../../services/preferences.service';
import { ScoreService } from '../../services/score.service';

@Component({
    selector: 'cost',
    templateUrl: './cost.component.html',
    styleUrls: ['./cost.component.scss'],
    providers: [PreferencesService, ScoreService]
})
export class CostComponent implements OnInit {
    
    public preferences: EventEmitter<any> = new EventEmitter();
    public credentials: EventEmitter<any> = new EventEmitter();
    public cars: Observable<any>;
    
    constructor(private carService: CostCarService,
        private costScoresService: CostScoresService,
        private preferencesService: PreferencesService,
        private scoreService: ScoreService) {
        
    }
    
    ngOnInit() {
        this.cars = this.credentials
            .mergeMap(this.carService.getProperties)
            .mergeMap(this.costScoresService.get)
            .combineLatest(this.preferences)
            .mergeMap(this.preferencesService.apply)
            .mergeMap(this.scoreService.apply);
        
        // this.cars.subscribe((cars: any) => console.log(cars));
    }
}
