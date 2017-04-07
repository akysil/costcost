import {
    Component,
    Input, OnInit
} from '@angular/core';

@Component({
    selector: 'cost-table',
    templateUrl: './cost-table.component.html',
    styleUrls: ['./cost-table.component.scss']
})
export class CostTableComponent implements OnInit {
    
    @Input() cars: any;
    
    @Input() data: any;
    
    cars2: any;
    
    constructor() {
    }
    
    ngOnInit() {
            this.cars2 = this.data;
    }
}
