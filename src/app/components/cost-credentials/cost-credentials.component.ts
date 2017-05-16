import {
    Component,
    EventEmitter,
    OnInit,
    Output
} from '@angular/core';
import { Credential } from '../cost-credential/cost-credential.component';
import { Car } from '../../interfaces/car.interface';

import _u from '../../services/cost-utilities.service';

@Component({
    selector: 'cost-credentials',
    templateUrl: 'cost-credentials.component.html',
    styleUrls: ['cost-credentials.component.scss']
})
export class CostCredentialsComponent implements OnInit {
    
    cars: Car[] = [];
    
    constructor() {}
    
    ngOnInit() {}
    
    add() {
        if (this.cars.length > 4) return;
        this.cars.push({timeStamp: _u.now()});
    }
    
    remove(i: number) {
        this.cars.splice(i, 1);
        this.emit();
    }
    
    applyCredential(i: number, credential: Credential) {
        this.cars[i].credentials = credential;
        this.emit();
    }
    
    emit() {
        this.valueChanges.emit(this.cars);
    }
    
    @Output() valueChanges: EventEmitter<Car[]> = new EventEmitter();
}
