import { Component, OnInit, EventEmitter, Input, Output, DoCheck } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import _u from '../../services/cost-utilities.service';

@Component({
    selector: 'cost-preferences',
    templateUrl: 'cost-preferences.component.html'
})
export class CostPreferencesComponent implements OnInit {
    
    defaults: any = {
        type: 'range',
        minValue: '0',
        maxValue: '20',
        startValue: '10'
    };
    preferences: string[] = [
        'performance',
        'prestige',
        'price',
        'test'
    ];
    form: FormGroup = new FormGroup({});
    
    constructor() {
        
        this.preferences.forEach((p: string) =>
            this.form.addControl(p, new FormControl(this.defaults.startValue)));
    
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
