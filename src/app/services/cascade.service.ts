import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EdmundsService } from './edmunds.service';
import { CostCascadeFormControl } from '../classes/cascade-form/cascade-form-control.class';

@Injectable()
export class CostFormService {
    
    constructor(private data: EdmundsService) {
        //
    }
    
    get getSource() {
        return (control: CostCascadeFormControl) => {
            let sources = {
                make: () => this.data.get('makes')
                    .map((data: any) => data.makes
                        .map(({name: label, niceName: value}: any) => ({label, value}))),
                model: () => this.data.get('makes')
                    .map((data: any) => data.makes
                        .find((make: any) => make.niceName === control.previous.value).models
                        .map(({name: label, niceName: value}: any) => ({label, value}))),
                year: () => this.data.get('makes')
                    .map((data: any) => data.makes
                        .find((make: any) => make.niceName === control.previous.previous.value).models
                        .find((model: any) => model.niceName === control.previous.value).years
                        .map(({year: label, year: value}: any) => ({label, value}))),
                style: () => this.data.get('styles', {
                        makeNiceName: control.previous.previous.previous.value,
                        modelNiceName: control.previous.previous.value,
                        year: control.previous.value
                    })
                    .map((data: any) => {
                        return data.styles
                            .map(({name: label, id: value}: any) => ({label, value}));
                    })
            };
            
            return (sources[control.label]) ? sources[control.label]() :
                Observable
                    .throw(`No method for control with label "${control.label}" and index [${control.index}]`);
        };
    }
    
    get getStyle() {
        return (id: string): Observable<any> => {
            return this.data.get('style', {id}, {view:'full'});
        }
    }
}
