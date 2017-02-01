import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { CostCascadeFormGroup, CostCascadeFormArray, CostCascadeFormControl } from '../../classes/cascade-form';
import { CostFormService } from '../../services/cascade.service';
import { CostFormValidatorsService } from '../../services/cost-form-validators.service';

@Component({
               selector: 'cost-cascade-form',
               templateUrl: './cost-cascade-form.component.html',
               styleUrls: ['./cost-cascade-form.component.scss'],
               providers: [CostFormService]
           })
export class CostCascadeComponent implements OnInit {
    
    private _submitted: boolean = false;
    private _value: any = {};
    
    constructor(private _service: CostFormService,
                private _validators: CostFormValidatorsService) {
    }
    
    form: CostCascadeFormGroup;
    
    ngOnInit() {
        
        //const temp = [
        //    {
        //        label: 'make',
        //        formState: {
        //            value: 'audi'
        //        }
        //    },
        //    {
        //        label: 'model',
        //        formState: {
        //            value: 'a4'
        //        }
        //
        //    },
        //    {
        //        label: 'year',
        //        formState: {
        //            value: '2015'
        //        }
        //    },
        //    {
        //        label: 'style',
        //        formState: {
        //            value: '200701698'
        //        }
        //    }
        //];
        
        this.form =
            new CostCascadeFormGroup({
                carPick: new CostCascadeFormArray(
                    ['make', 'model', 'year', 'style']
                        .map((controlOptions) => {
                            return new CostCascadeFormControl(controlOptions, {
                                optionsObserverFn: this._service.getSource,
                                validator: Validators.required
                            })
                        }),
                    this._validators.hasDisabled
                )
            });
        
        (<CostCascadeFormArray>this.form.get('carPick'))
            .init();
        
        (<CostCascadeFormArray>this.form.get('carPick'))
            .statusChanges
            .subscribe((status: string) => {
                if (status === 'VALID') {
                    const id = this.form.get('carPick')['controls'][3].value;
                    this._service.getStyle(id).subscribe((data: any) => {
                        this._value = data;
                    });
                }
            });
    }
    
    submit() {
        this._submitted = true;
    }
    
    get value() {
        return this._value;
    }
    
    get submitted() {
        return this._submitted;
    }
}
