import { Component, OnInit, EventEmitter, Input, Output, DoCheck } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import _u from '../../services/cost-utilities.service';

@Component({
    selector: 'cost-preferences',
    templateUrl: 'cost-preferences.component.html'
})
export class CostPreferencesComponent implements OnInit {
    
    defaults: any;
    form: FormGroup;
    
    constructor() {
        this.defaults = {
            type: 'range',
            min: '1',
            max: '10'
        };
    
        this.form = new FormGroup({
            performance: new FormControl(this.defaults.min),
            prestige: new FormControl(this.defaults.min),
            price: new FormControl(this.defaults.min),
        });
    
        this.form.valueChanges.subscribe((value: any) => this.emit(value));
    }
    
    ngOnInit() {
        
        // TODO: setTimeout
        setTimeout(() => this.emit(this.form.value));
    }
    
    @Output() valueChanges: EventEmitter<any> = new EventEmitter();
    
    emit(value: string) {
        return this.valueChanges.emit(_u.mapValues(value, Number));
    }
}
