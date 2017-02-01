import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/delay';

import { CostCascadeFormControlOption, CostCascadeFormPattern, CostCascadeFormFormState } from '../../interfaces/cost-cascade-form.interface';

@Injectable()
export class CostCascadeFormControl extends FormControl {
    
    private _label: string;
    private _options: undefined | null | CostCascadeFormControlOption[];
    private _optionsObserverFn: { (control: CostCascadeFormControl): Observable<any> };
    private _delay: number;
    private _defaultState: CostCascadeFormFormState;
    
    constructor(individual: CostCascadeFormPattern = {}, dafault: CostCascadeFormPattern = {}) {
        
        const formState: CostCascadeFormFormState = {value: null, disabled: true, ...dafault.formState, ...individual.formState};
        const validator = [].concat(dafault.validator).concat(individual.validator).filter(Boolean);
        const asyncValidator = [].concat(dafault.asyncValidator).concat(individual.asyncValidator).filter(Boolean);
        
        super(formState, validator, asyncValidator);
        
        this._label = individual.label || (typeof arguments[0] === 'string') && arguments[0] || dafault.label || (typeof arguments[1] === 'string') && arguments[1];
        this._optionsObserverFn = individual.optionsObserverFn || dafault.optionsObserverFn ||
            ((control) =>
                Observable.throw(`Source function for control "${control.label}" was not found!`));
        this._delay = individual.delay || dafault.delay || 0;
        this._defaultState = formState;
        
        this.statusChanges.subscribe(() => {
            if (this.status === 'VALID' && !this.last) this.next.init();
        });
    }
    
    init() {
        
        this.options = [];
        
        this.resetAllDown();
        
        const onNext = (options: CostCascadeFormControlOption[]) => {
            this.options = options;
            this.enable();
        };
        const onError = (e: Error) => {
            console.log(e);
            this.options = null;
        };
        
        this._optionsObserverFn(this)
            .delay(this._delay)
            .subscribe(onNext, onError);
    }
    
    get label(): string {
        return this._label;
    };
    
    get options(): CostCascadeFormControlOption[] {
        return this._options;
    }
    
    set options(options: CostCascadeFormControlOption[]) {
        this._options = options;
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
            if(this.value != this._defaultState.value || this.disabled != this._defaultState.disabled) {
                this.reset(this._defaultState);
            }
            if (!this.last) {
                this.next.resetAllDown();
            }
        };
    }
}
