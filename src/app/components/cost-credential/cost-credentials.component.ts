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

@Component({
    selector: 'cost-credential',
    templateUrl: 'cost-credentials.component.html',
    styleUrls: ['cost-credentials.component.scss']
})
export class CostCredentialComponent implements OnInit {
    
    form: CostCascadeFormGroup;
    
    constructor(private service: CostCascadeService,
        private validators: CostFormValidatorsService) {
    }
    
    ngOnInit() {
        
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
            .subscribe((flattenValue: any) => this.valueChanges.emit(flattenValue));
        
        this.form.get('zip').setValue('98087');
    }
    
    @Output() valueChanges: EventEmitter<any> = new EventEmitter();
}
