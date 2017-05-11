import {
    Component,
    Input, OnInit
} from '@angular/core';
import _u from '../../services/cost-utilities.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'cost-table',
    templateUrl: './cost-table.component.html',
    styleUrls: ['./cost-table.component.scss']
})
export class CostTableComponent implements OnInit {
    
    values: any = _u.values; // TODO: move to pipe
    @Input() data: any;
    cars: Observable<any>;
    
    constructor() {
        //
    }
    
    ngOnInit() {
        this.cars = this.data
            .startWith([])
        ;
    }
}
