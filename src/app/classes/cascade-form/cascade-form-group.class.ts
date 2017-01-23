import { Injectable } from '@angular/core';
import {
    FormGroup,
    ValidatorFn,
    AsyncValidatorFn
} from '@angular/forms';


@Injectable()
export class CostFormGroup extends FormGroup {
    
    constructor(controls: any,
                validator?: ValidatorFn,
                asyncValidator?: AsyncValidatorFn) {
        super(controls, validator, asyncValidator);
    }
}
