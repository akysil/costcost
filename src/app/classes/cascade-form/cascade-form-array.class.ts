import { Injectable } from '@angular/core';
import {
    FormArray,
    ValidatorFn,
    AsyncValidatorFn
} from '@angular/forms';

import { CostFormControl } from './cascade-form-control.class';

@Injectable()
export class CostFormArray extends FormArray {
    
    controls: CostFormControl[];
    
    constructor(controls: CostFormControl[],
                validator?: ValidatorFn,
                asyncValidator?: AsyncValidatorFn) {
        super(controls, validator, asyncValidator);
    }
    
    init() {
        this.controls[0].init();
    }
}
