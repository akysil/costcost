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
    
    @Output() valueChanges: EventEmitter<any> = new EventEmitter();
    
    constructor() {
        this.defaults = {
            type: 'range',
            min: '1',
            max: '100'
        };
    
        this.form = new FormGroup({
            performance: new FormControl(this.defaults.min),
            prestige: new FormControl(this.defaults.min),
            price: new FormControl(this.defaults.min),
        });
    
        this.form.valueChanges.subscribe((value: any) => this._emit(value));
    }
    
    ngOnInit() {
        
        // TODO: setTimeout
        setTimeout(() => this._emit(this.form.value));
    }
    
    private _emit(value: any) {
        return this.valueChanges.emit(_u.mapValues(value, Number));
    }
    
}
