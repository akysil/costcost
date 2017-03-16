import {
    Component,
    Input
} from '@angular/core';

@Component({
    selector: 'cost-table',
    templateUrl: './cost-table.component.html',
    styleUrls: ['./cost-table.component.scss']
})
export class CostTableComponent {
    
    @Input() cars: any;
    
    constructor() {
    }
}
