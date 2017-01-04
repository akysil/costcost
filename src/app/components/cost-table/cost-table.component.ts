import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
    selector: 'cost-table',
    templateUrl: './cost-table.component.html',
    styleUrls: ['./cost-table.component.css']
})
export class CostTableComponent implements OnInit {
    
    private dataService: DataService;
    
    public makes: any;
    
    constructor(dataService: DataService) {
        this.dataService = dataService;
        this.makes = [];
    }
    
    ngOnInit() {
        
        //console.log(this.dataService.get('makes').subscribe);
        
        this.dataService
            .get('allMakes')
            .subscribe(data => this.makes = data);
    }
}
