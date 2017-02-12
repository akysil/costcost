import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { CostCascadeFormGroup, CostCascadeFormArray, CostCascadeFormControl } from '../../classes/cascade-form';
import { CostCascadeService } from '../../services/cost-cascade.service';
import { CostFormValidatorsService } from '../../services/cost-form-validators.service';
import { CostCascadeFormControlOption, CostCascadeValue } from '../../interfaces/cost-cascade-form.interface';

@Component({
    selector: 'cost-cascade-form',
    templateUrl: 'cost-cascade.component.html',
    styleUrls: ['cost-cascade.component.scss']
})
export class CostCascadeComponent implements OnInit {
    
    private submitted: boolean = false;
    private value: CostCascadeValue = null;
    
    constructor(private service: CostCascadeService,
        private validators: CostFormValidatorsService) {
    }
    
    form: CostCascadeFormGroup;
    
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
        
        const cascade = (<CostCascadeFormArray>this.form.get('cascade'));
        
        this.form
            .statusChanges
            .subscribe((status: string) => {
                if (status === 'VALID') {
                    this.value = this.form.flattenValue;
                    this.emitValue();
                } else {
                    this.reset();
                }
            });
        
        cascade.init();
        
        this.form.get('zip').setValue('98087');
        // this.form.get('state').setValue('new');
        
        this.emitSubmit();
        this.emitValue();
    }
    
    get submit() {
        return () => {
            this.submitted = true;
            this.emitSubmit();
        };
    }
    
    get reset() {
        return () => {
            if (this.value) {
                this.value = null;
                this.emitValue();
            }
            if (this.submitted) {
                this.submitted = false;
                this.emitSubmit();
            }
        };
    }
    
    get emitValue() {
        return () => {
            return this.valueChanges.emit(this.value);
        };
    }
    
    get emitSubmit() {
        return () => {
            return this.submitChanges.emit(this.submitted);
        };
    }
    
    @Output() submitChanges: EventEmitter<any> = new EventEmitter();
    @Output() valueChanges: EventEmitter<any> = new EventEmitter();
}
