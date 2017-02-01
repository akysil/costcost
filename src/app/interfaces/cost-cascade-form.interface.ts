import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { CostCascadeFormControl } from '../classes/cascade-form';

export interface CostCascadeFormOptionsObserverFn {
    (control: CostCascadeFormControl): Observable<any>
}

export interface CostCascadeFormPattern {
    label?: string,
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

export interface CostCascadeFormControlOption {
    label: string,
    value: string
}