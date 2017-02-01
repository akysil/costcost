import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class HelpersService {
    
    constructor() {
        //
    }
    
    setDynamicProperty = (formGroup: FormGroup, keys: string[], value: any): void => {
        return (<any>keys.reduce((formGroup, key) => {
            return (<any>formGroup.get(key));
        }, formGroup).setValue(value, {onlySelf: true}));
    };
}
