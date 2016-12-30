import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'cost-table',
	templateUrl: './cost-table.component.html',
	styleUrls: ['./cost-table.component.css']
})
export class CostTableComponent implements OnInit {
	
	private storage: DataService;
	
	public makes: any;
	
	constructor(storage: DataService) {
		this.storage = storage;
		this.makes = [];
	}
	
	ngOnInit() {
		this.storage
			.getEdmundsAllMakes()
			.subscribe((data) => {
				console.log(data);
				this.makes = data.makes;
			});
	}
}
