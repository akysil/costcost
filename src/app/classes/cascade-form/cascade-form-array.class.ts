import { Injectable } from '@angular/core';
import {
    FormArray,
    ValidatorFn,
    AsyncValidatorFn
} from '@angular/forms';

import { CostCascadeFormControl } from './cascade-form-control.class';

@Injectable()
export class CostCascadeFormArray extends FormArray {
    
    controls: CostCascadeFormControl[];
    
    constructor(controls: CostCascadeFormControl[],
                validator?: ValidatorFn,
                asyncValidator?: AsyncValidatorFn) {
        super(controls, validator, asyncValidator);
    }
    
    init() {
        this.controls[0].init();
    }
    
    get valueObject() {
        return this['controls']
            .reduce((_value: any, {label, value}: any) => {
                _value[label] = value;
                return _value;
            }, {});
    }
}
