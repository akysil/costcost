import { Injectable } from '@angular/core';
import {
    FormGroup,
    ValidatorFn,
    AsyncValidatorFn
} from '@angular/forms';


@Injectable()
export class CostCascadeFormGroup extends FormGroup {
    
    constructor(controls: any,
                validator?: ValidatorFn,
                asyncValidator?: AsyncValidatorFn) {
        super(controls, validator, asyncValidator);
    }
}
