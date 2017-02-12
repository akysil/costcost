import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EdmundsService } from './edmunds.service';
import { CostCascadeFormControl } from '../classes/cascade-form/cascade-form-control.class';
import { CostCascadeFormArray } from '../classes/cascade-form/cascade-form-array.class';

@Injectable()
export class CostCascadeService {
    
    constructor(private data: EdmundsService) {
        //
    }
    
    get getSource() {
        return (control: CostCascadeFormControl) => {
            let sources = {
                make: () => this.data.get('makes', {}, {state: findControlValueByLabel('state')})
                    .map((data: any) => {
                        return data.makes
                            .map(({name: label, niceName: value}: any) => ({label, value}));
                    }),
                model: () => this.data.get('makes', {}, {state: findControlValueByLabel('state')})
                    .map((data: any) => data.makes
                        .find((make: any) => make.niceName === control.previous.value).models
                        .map(({name: label, niceName: value}: any) => ({label, value}))),
                year: () => this.data.get('makes', {}, {state: findControlValueByLabel('state')})
                    .map((data: any) => data.makes
                        .find((make: any) => make.niceName === findControlValueByLabel('make')).models
                        .find((model: any) => model.niceName === findControlValueByLabel('model')).years
                        .map(({year: label, year: value}: any) => ({label, value}))),
                styleId: () => this.data.get('styles', {
                        makeNiceName: findControlValueByLabel('make'),
                        modelNiceName: findControlValueByLabel('model'),
                        year: findControlValueByLabel('year')
                    })
                    .map((data: any) => {
                        return data.styles
                            .map(({name: label, id: value}: any) => ({label, value}));
                    })
            };
            
            return (sources[control.label]) ? sources[control.label]() :
                Observable
                    .throw(`No method for control with label "${control.label}" on index [${control.index}]`);
    
            function findControlValueByLabel(query: string) {
                return (<CostCascadeFormArray>control.parent)
                    .controls
                    .find(({label}: CostCascadeFormControl) => label === query)
                    .value;
            }
        };
    }
}
