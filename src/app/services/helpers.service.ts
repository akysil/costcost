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
    
    resetDependents: any = (form: FormGroup, data: any, chain: string[]) => {
    
        // console.log('data: ', JSON.stringify(data));
    
        if (!this.resetDependents._state) {
            this.resetDependents._state = {};
        }
    
        let _state = this.resetDependents._state;
    
        let dataCollection = chain.map((field) => {
            return { key: field, value: data[field] || ''}
        });
    
        dataCollection.reduce(({reset: reset, disable: disable}: any, field: any) => {
            let formField = form.get(field.key);
        
            if (typeof _state[field.key] === 'undefined') {
                _state[field.key] = '';
            }
        
            if (reset) {
                _state[field.key] = '';
                
                if (formField.value != null) {
                    formField.setValue(null);
                }
                
                if (disable && formField.status != 'DISABLED') {
                    formField.disable();
                }
                
                if (!disable && formField.status === 'DISABLED') {
                    formField.enable();
                }
                
                return {reset: true, disable: true};
            }
        
            if (field.value != _state[field.key]) {
                _state[field.key] = field.value;
                return {reset: true, disable: false};
            }
        
            return {reset: false, disable: false};
            
        }, {reset: false, disable: false});
        
        // console.log('_state: ', JSON.stringify(_state) );
    };
}
