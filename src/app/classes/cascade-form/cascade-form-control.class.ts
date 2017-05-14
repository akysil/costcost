import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/delay';

import {
    CostCascadeFormControlOption, CostCascadeFormPattern, CostCascadeFormFormState,
    CostCascadeFormOptionsObserverFn
} from '../../interfaces/cost-cascade-form.interface';

@Injectable()
export class CostCascadeFormControl extends FormControl {
    
    private _label: string;
    private _options: undefined | null | CostCascadeFormControlOption[];
    private _optionsObserverFn: { (control: CostCascadeFormControl): Observable<any> };
    private _delay: number;
    private _defaultState: CostCascadeFormFormState;
    
    constructor(specific: CostCascadeFormPattern = {}, general: CostCascadeFormPattern = {}) {
        
        const formState: CostCascadeFormFormState = {
            value: null, disabled: true, ...general.formState, ...specific.formState
        };
        const validator = [].concat(general.validator)
            .concat(specific.validator)
            .filter(Boolean);
        const asyncValidator = [].concat(general.asyncValidator)
            .concat(specific.asyncValidator)
            .filter(Boolean);
        
        super(formState, validator, asyncValidator);
        
        this._label = specific.label || (typeof arguments[0] === 'string') && arguments[0] || general.label || (typeof arguments[1] === 'string') && arguments[1];
        
        const predefinedOptions = this._composeOptions(specific.options, general.options);
        this._optionsObserverFn = this._composeOptionsObserverFn(specific.optionsObserverFn, general.optionsObserverFn, predefinedOptions);
        
        this._delay = specific.delay || general.delay || 0;
        
        this._defaultState = formState;
        
        this.statusChanges.subscribe(() => {
            if (this.status === 'VALID' && !this.last) this.next.init();
        });
    }
    
    init() {
        
        this.resetAllDown();
        
        const onNext = (options: CostCascadeFormControlOption[]) => {
            this._options = options;
            this.enable(); // bug: invoke value changes twice
        };
        const onError = (e: Error) => {
            console.error(e);
            this._options = null;
        };
        
        this._optionsObserverFn(this)
            .delay(this._delay)
            .subscribe(onNext, onError);
    }
    
    reset() {
        if (this.value != this._defaultState.value ||
            this.disabled != this._defaultState.disabled) {
            super.reset(this._defaultState);
        }
        this._options = null;
    }
    
    get label(): string {
        return this._label;
    };
    
    get options(): CostCascadeFormControlOption[] {
        return this._options;
    }
    
    get index(): number {
        return (<Array<CostCascadeFormControl>>this.parent['controls'])
            .findIndex((control: CostCascadeFormControl) => control === this);
    }
    
    get first(): boolean {
        return this.index === 0;
    }
    
    get last(): boolean {
        return (this.index + 1) === this.parent['controls']['length'];
    }
    
    get next(): CostCascadeFormControl | null {
        if (this.last) return null;
        return this.parent['controls'][this.index + 1];
    }
    
    get previous(): CostCascadeFormControl | null {
        if (this.index === 0) return null;
        return this.parent['controls'][this.index - 1];
    }
    
    get resetAllDown() {
        return () => {
            this.reset();
            if (!this.last) {
                this.next.resetAllDown();
            }
        };
    }
    
    get _composeOptions() {
        return (specific: CostCascadeFormControlOption[],
            general: CostCascadeFormControlOption[]) => {
            const options = specific || general;
            return (Array.isArray(options)) ? options.map((option: any) => {
                return (typeof option === 'string') ? {label: option, value: option} : option;
            }) : null;
        }
    }
    
    get _composeOptionsObserverFn() {
        return (specificFn: CostCascadeFormOptionsObserverFn,
            generalFn: CostCascadeFormOptionsObserverFn,
            predefined: CostCascadeFormControlOption[]) => {
            if (predefined) return () => Observable.of(predefined);
            return specificFn || generalFn || ((control) =>
                    Observable.throw(`Source function for control "${control.label}" was not found!`));
        }
    }
}
