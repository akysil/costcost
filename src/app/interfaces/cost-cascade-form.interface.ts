import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { CostCascadeFormControl } from '../classes/cascade-form';

export interface CostCascadeFormOptionsObserverFn {
    (control: CostCascadeFormControl): Observable<any>
}

export interface CostCascadeFormPattern {
    label?: string,
    options?: CostCascadeFormControlOption[],
    optionsObserverFn?: CostCascadeFormOptionsObserverFn,
    validator?: ValidatorFn | ValidatorFn[],
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
    formState?: CostCascadeFormFormState,
    delay?: number
}

export interface CostCascadeFormFormState {
    value?: boolean | string,
    disabled?: boolean
}

export type CostCascadeFormControlOption = string | {
    label: string,
    value: string
};

export interface CostCascadeValue {
    zip: string,
    state: 'NEW' | 'USED',
    make: string,
    model: string,
    year: string,
    styleId: string
}
