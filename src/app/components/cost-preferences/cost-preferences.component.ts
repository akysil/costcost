import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'cost-preferences',
    templateUrl: 'cost-preferences.component.html'
})
export class CostPreferencesComponent implements OnInit {
    
    constructor() {}
    
    defaults: any;
    form: FormGroup;
    
    ngOnInit() {
        
        this.defaults = {
            type: 'range',
            min: '1',
            max: '100'
        };
        
        this.form = new FormGroup({
            performance: new FormControl('1'),
            prestige: new FormControl('1'),
            price: new FormControl('1'),
        });
        
        this.form.valueChanges.subscribe((value: any) => this.valueChange.emit(value));
    }
    
    @Output() valueChange: EventEmitter<any> = new EventEmitter();
}
