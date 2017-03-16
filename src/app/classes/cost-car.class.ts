import { Injectable } from '@angular/core';
import { CostCarOptions } from '../interfaces/cost-car-options.interface';
import { CostCarService } from '../services/cost-car.service';
import { CostCascadeValue } from '../interfaces/cost-cascade-form.interface';

@Injectable()
export class CostCar {
    
    private _credentials: CostCascadeValue = {};
    private _properties: CostCarOptions = {};
    private _score: number = 0;
    private get  _credentialsAreValid() {
        const {zip, state, styleId} = this._credentials;
        return zip && state && styleId &&
        Object.keys(this._credentials).every((key: any) => this._credentials[key]);
    }
    
    constructor(private costCarService: CostCarService) {
        // console.log(this);
    }
    
    get applyCredentials() {
        return (credentials: CostCascadeValue) => {
            this._credentials = credentials;
            this.applyProperties(credentials);
        };
    }
    
    get applyProperties() {
        return (credentials: CostCascadeValue) => {
            
            if (Object.keys(this._properties).length) {
                this._properties = {};
            }
            
            if (this._credentialsAreValid) {
                
                const onNext = (options: CostCarOptions) =>
                    this._properties = {...this._properties, ...options};
                const onError = (e: any) =>
                    console.log(e);
                const onComplete = () =>
                    this.applyScore();
                
                this.costCarService
                    .getOptions(credentials)
                    .subscribe(onNext, onError, onComplete);
            }
        };
    }
    
    get applyScore() {
        return () => {
            return this._score = +new Date();
        };
    }
    
    get credentials() {
        return this._credentials;
    }
    
    get properties() {
        return this._properties;
    }
    
    get score() {
        return this._score;
    }
}
