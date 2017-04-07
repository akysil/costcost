import {
    Component,
    EventEmitter,
    OnInit,
    Output
} from '@angular/core';

@Component({
    selector: 'cost-credentials',
    templateUrl: 'cost-credentials.component.html',
    styleUrls: ['cost-credentials.component.scss']
})
export class CostCredentialsComponent implements OnInit {
    
    credentials: any[] = [];
    
    constructor() {}
    
    ngOnInit() {}
    
    add() {
        if (this.credentials.length > 4) return;
        this.credentials.push({});
        this.emit();
    }
    
    remove(i: number) {
        this.credentials.splice(i, 1);
        this.emit();
    }
    
    applyCredential(i: number, data: any) {
        Object.assign(this.credentials[i], data);
        this.emit();
    }
    
    emit() {
        this.valueChanges.emit(this.credentials);
    }
    
    @Output() valueChanges: EventEmitter<any> = new EventEmitter();
}
