import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators } from '@angular/forms';

import { CostFormGroup, CostFormArray, CostFormControl } from '../../classes/cascade-form';
import { CostFormService } from '../../services/cost-form.service';
import { CostFormValidatorsService } from '../../services/cost-form-validators.service';

@Component({
               selector: 'cost-table',
               templateUrl: './cost-table.component.html',
               styleUrls: ['./cost-table.component.css'],
               providers: [CostFormService]
           })
export class CostTableComponent implements OnInit {
    
    // private detectChanges = this.changeDetector.detectChanges.bind(this.changeDetector);
    
    private _styleDetails: any;
    
    constructor(private changeDetector: ChangeDetectorRef,
                private service: CostFormService,
                private validators: CostFormValidatorsService) {
    }
    
    form: CostFormGroup;
    
    ngOnInit() {
        
        this.form =
            new CostFormGroup({
                carPick: new CostFormArray(
                    ['make', 'model', 'year', 'style'].map((controlOptions) => {
                        return new CostFormControl(controlOptions, {
                            optionsObserverFn: this.service.getSource,
                            validator: Validators.required
                        })
                    }),
                    this.validators.hasDisabled
                )
            });
        
        (<CostFormArray>this.form.get('carPick')).init();
        
        // console.log(<CostFormArray>this.form.get('carPick'));
    
        (<CostFormArray>this.form.get('carPick')).statusChanges.subscribe((status: string) => {
            if (status === 'VALID') {
                this.getOptions(this.form.value.carPick[3]);
            }
        });
    }
    
    get styleDetails() {
        return JSON.stringify(this._styleDetails);
    }
    
    submit() {
        console.log(this.form);
    }
    
    getOptions(id: string) {
        this.service.getStyle(id).subscribe((data: any) => this._styleDetails = data);
    }
}
