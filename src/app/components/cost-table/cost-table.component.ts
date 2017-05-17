import {
    Component,
    Input, OnInit
} from '@angular/core';
import _u from '../../services/cost-utilities.service';
import { Observable } from 'rxjs/Observable';
import { PropertiesService } from '../../services/properties.service';

@Component({
    selector: 'cost-table',
    templateUrl: './cost-table.component.html',
    styleUrls: ['./cost-table.component.scss']
})
export class CostTableComponent implements OnInit {
    
    properties: string[];
    @Input() data: any;
    cars: Observable<any>;
    
    constructor(private propertiesService: PropertiesService) {
        this.properties = _u.map(propertiesService.properties, 'name');
    }
    
    ngOnInit() {
        this.cars = this.data
            .startWith([])
        ;
    
        // this.cars.subscribe((cars: any) => console.log(_u.stringify(cars, null, 4)));
    }
}
