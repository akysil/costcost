import { Injectable } from '@angular/core';
import { CostCarOptions } from '../interfaces/cost-car-options.interface';
import { CostCarService } from '../services/cost-car.service';
import { CostCascadeFormControlOption, CostCascadeValue } from '../interfaces/cost-cascade-form.interface';


@Injectable()
export class CostCar {
    
    private _credentials: CostCascadeValue;
    private _submitted: boolean = false;
    private _ready: boolean = false;
    
    public options: CostCarOptions;
        
    constructor(private costCarService: CostCarService) {
        // console.log(this);
    }
    
    get applyCredentials() {
        return (credentials: CostCascadeValue) => {
    
            this.reset();
            
            this._ready = false;
            this._credentials = credentials;
            
            if (!credentials) return;
    
            const onNext = (options: CostCarOptions) =>
                this.options = {...(this.options || {}), ...options};
            const onError = (e: any) =>
                console.log(e);
            const onComplete = () =>
                this._ready = true;

            this.costCarService
                .getOptions(credentials)
                .subscribe(onNext, onError, onComplete);
        };
    }
    
    get applySubmit() {
        return (submitted: boolean) => this._submitted = submitted;
    }
    
    get reset() {
        return () => {
            return delete this.options;
        }
    }
    
    get submitted() {
        return this._submitted;
    }
    
    get ready() {
        return this._ready;
    }
}
