import { Injectable } from '@angular/core';
import { CostCarOptions } from '../interfaces/cost-car-options.interface';
import { CostCarService } from '../services/properties.service';
import { CostCascadeValue } from '../interfaces/cost-cascade-form.interface';

@Injectable()
export class CostCar {
    
    public timeStamp: number;
    public score: number; // TODO: apply getter and setter
    
    private _credentials: CostCascadeValue;
    private _properties: CostCarOptions;
    private _ready: boolean;
    
    private get _credentialsAreValid() {
        const {zip, state, styleId} = this._credentials;
        return zip && state && styleId &&
            Object.keys(this._credentials).every((key: any) => this._credentials[key]);
    }
    
    private _reset() {
        this.score = 0;
        this._credentials = {};
        this._properties = {};
        this._ready = false;
    }
    
    private _updateScore() {
        this._ready = true;
        this._applyScore();
    }
    
    constructor(private _costCarService: CostCarService, private _applyScore: any) {
        this.timeStamp = +new Date();
        this._reset();
    }
    
    get applyCredentials() {
        return (credentials: CostCascadeValue) => {
            
            this._reset();
            this._credentials = credentials;
            this.applyProperties(credentials);
        };
    }
    
    get applyProperties() {
        return (credentials: CostCascadeValue) => {
            
            if (this._credentialsAreValid) {
                
                const onNext = (options: CostCarOptions) =>
                    this._properties = {...this._properties, ...options};
                const onError = (e: any) =>
                    console.log(e);
                const onComplete = () =>
                    this._updateScore();
                
                this._costCarService
                    .getOptions(credentials)
                    .subscribe(onNext, onError, onComplete);
            }
        };
    }
    
    get credentials() {
        return this._credentials;
    }
    
    get properties() {
        return this._properties;
    }
    
    get ready() {
        return this._ready;
    }
}
