import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PropertiesService } from '../../services/properties.service';
import { CostScoresService } from '../../services/cost-scores.service';
import { Observable } from 'rxjs';
import { PreferencesService } from '../../services/preferences.service';
import { ScoreService } from '../../services/score.service';
import _u from '../../services/cost-utilities.service';

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
    
    constructor(
        private propertiesService: PropertiesService,
        private scoresService: CostScoresService,
        private preferencesService: PreferencesService,
        private scoreService: ScoreService) {
        
    }
    
    ngOnInit() {
        this.cars = this.credentials
            .mergeMap(this.propertiesService.apply)
            .mergeMap(this.scoresService.get)
            .combineLatest(this.preferences)
            .mergeMap(this.preferencesService.apply)
            .mergeMap(this.scoreService.apply);
        
        // this.cars.subscribe((cars: any) => console.log(cars));
    }
}
