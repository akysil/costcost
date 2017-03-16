import { Injectable, EventEmitter, Output } from '@angular/core';
import {
    FormGroup,
    ValidatorFn,
    AsyncValidatorFn
} from '@angular/forms';
import { CostCascadeFormArray } from './cascade-form-array.class';
import { CostCascadeValue } from '../../interfaces/cost-cascade-form.interface';


@Injectable()
export class CostCascadeFormGroup extends FormGroup {
    
    constructor(controls: any,
                validator?: ValidatorFn,
                asyncValidator?: AsyncValidatorFn) {
        
        super(controls, validator, asyncValidator);
        
        this.valueChanges
            .distinctUntilChanged((newVal:any, oldVal:any) => JSON.stringify(newVal) === JSON.stringify(oldVal))
            .subscribe(() => this.flattenValueChanges.emit(this.flattenValue));
    }
    
    get flattenValue(): CostCascadeValue {
        let flatten: CostCascadeValue;
        let value = this.value;
        for (const key in value) {
            if (!value.hasOwnProperty(key)) { continue; }
            flatten = (Array.isArray(value[key]))
                ? {...flatten, ...(<CostCascadeFormArray>this.get(key)).valueObject}
                : {...flatten, ...{[key]: value[key]}};
        }
        return flatten;
    }
    
    @Output() flattenValueChanges: EventEmitter<any> = new EventEmitter();
}
