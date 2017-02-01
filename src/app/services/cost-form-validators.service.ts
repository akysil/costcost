import { Injectable } from '@angular/core';
import { CostCascadeFormArray } from '../classes/cascade-form/cascade-form-array.class';
import { ValidatorFn } from '@angular/forms';

//type C = {
//    hasDisabled: true
//}

@Injectable()
export class CostFormValidatorsService {
    
    constructor() {
        //
    }
    
    hasDisabled: ValidatorFn = (input: CostCascadeFormArray) => {
        let hasDisabled = !input.controls.every((control) => control.status != 'DISABLED');
        return (hasDisabled) ? {hasDisabled} : null;
    };
}
