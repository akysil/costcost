import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

@Injectable()
export class CostFormValidatorsService {
    
    constructor() {}
    
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
