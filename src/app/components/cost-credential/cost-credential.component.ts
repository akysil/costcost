import {
    Component,
    EventEmitter,
    OnInit,
    Output
} from '@angular/core';
import {
    Validators,
    FormControl
} from '@angular/forms';

import {
    CostCascadeFormGroup,
    CostCascadeFormArray,
    CostCascadeFormControl
} from '../../classes/cascade-form';
import { CostCascadeService } from '../../services/cost-cascade.service';
import { CostFormValidatorsService } from '../../services/cost-form-validators.service';
import _u from '../../services/cost-utilities.service';

@Component({
    selector: 'cost-credential',
    templateUrl: 'cost-credential.component.html',
    styleUrls: ['cost-credential.component.scss']
})
export class CostCredentialComponent implements OnInit {
    
    private _timeStamp: number;
    form: CostCascadeFormGroup;
    
    @Output() valueChanges: EventEmitter<any> = new EventEmitter();
    
    constructor(private service: CostCascadeService,
        private validators: CostFormValidatorsService) {
    }
    
    ngOnInit() {
        
        this._timeStamp = _u.now();
        
        this.form =
            new CostCascadeFormGroup({
                zip: new FormControl('', [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(5),
                    Validators.pattern(/\d/g)
                ]),
                cascade: new CostCascadeFormArray(
                    [
                        {
                            label: 'state',
                            options: ['new', 'used']
                        }, 'make', 'model', 'year', 'styleId']
                        .map((controlOptions) => {
                            return new CostCascadeFormControl(controlOptions, {
                                optionsObserverFn: this.service.getSource,
                                validator: Validators.required
                            })
                        }),
                    this.validators.hasDisabled
                )
            }, this.validators.hasDisabled);
        
        (<CostCascadeFormArray>this.form.get('cascade')).init();
        
        this.form
            .flattenValueChanges
            .subscribe((flattenValue: any) => this.emit(flattenValue));
        
        this.form.get('zip').setValue('98087');
    }
    
    get emit() {
        return (credentials: any) => this.valueChanges.emit({
            _timeStamp: this._timeStamp,
            credentials
        });
    }
}
