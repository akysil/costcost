import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'cost-preferences',
    templateUrl: 'cost-preferences.component.html'
})
export class CostPreferencesComponent implements OnInit {
    
    constructor() {
        // console.log(this);
    }
    
    inputOptions: any;
    optionsForm: FormGroup;
    preferenceValue: any;
    
    ngOnInit() {
        
        this.inputOptions = {
            type: 'range',
            min: '1',
            max: '100'
        };
        
        this.optionsForm = new FormGroup({
            performance: new FormControl('1'),
            prestige: new FormControl('1'),
            price: new FormControl('1'),
        });
        
        this.optionsForm.valueChanges.subscribe((value: any) => {
            this.preferenceValue = value;
            this.valueChange.emit(this.preferenceValue);
        });
    }
    
    @Input()
    get value() {
        return this.preferenceValue;
    }
    
    @Output() valueChange: EventEmitter<any> = new EventEmitter();
}
