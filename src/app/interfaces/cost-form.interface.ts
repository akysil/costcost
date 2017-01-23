import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { CostFormControl } from '../classes/cascade-form';

export interface CostFormOptionsObserverFn {
    (control: CostFormControl): Observable<any>
}

export interface CostFormPattern {
    label?: string,
    optionsObserverFn?: CostFormOptionsObserverFn,
    validator?: ValidatorFn | ValidatorFn[],
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
    formState?: CostFormFormState,
    delay?: number
}

export interface CostFormFormState {
    value?: boolean | string,
    disabled?: boolean
}

export interface CostFormControlOption {
    label: string,
    value: string
}