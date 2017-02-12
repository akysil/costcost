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
    
    hasDisabled: ValidatorFn = (input: any) => {
        const controls = input['controls'];
        
        const collection = (Array.isArray(controls))
            ? controls
            : Object.keys(controls).map((key: any) => controls[key]);
        
        return (collection.some((item: any) => item.status === 'DISABLED'))
            ? {hasDisabled: true}
            : null;
    };
}
