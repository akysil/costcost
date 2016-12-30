import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'cost-table',
  templateUrl: './cost-table.component.html',
  styleUrls: ['./cost-table.component.css']
})
export class CostTableComponent implements OnInit {
  
  private storage: LocalStorageService;
  
  constructor(localStorage: LocalStorageService) {
    this.storage = localStorage;
  }
  
  public allMakes: any;
  
  ngOnInit() {
    this.storage
      .getEdmundsAllMakes()
      .subscribe((data) => this.allMakes = data);
  }
}
