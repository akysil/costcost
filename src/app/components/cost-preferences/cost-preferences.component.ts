import { Component, OnInit, EventEmitter, Input, Output, DoCheck } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
    
        this.form.valueChanges.subscribe((value: any) => this.valueChanges.emit(value));
    }
    
    ngOnInit() {
        
        // TODO: setTimeout
        setTimeout(() => this.valueChanges.emit(this.form.value));
    }
    
}
