import { Component, OnInit } from '@angular/core';

@Component({
               selector: 'cost-table',
               templateUrl: './cost-table.component.html',
               styleUrls: ['./cost-table.component.scss']
           })
export class CostTableComponent implements OnInit {
    
    // private _carsFromStorage = localStorage.getItem('costTableCars');
    
    cars: any[] = [];
    
    constructor() {
    }
    
    ngOnInit() {
        //
    }
    
    add() {
        this.cars.push({});
    }
    
    delete(carToDelete: any) {
        this.cars = this.cars.filter((car: any) => car != carToDelete);
    }
    
    setData(car: any, {value, submitted}: any) {
        car.value = value;
        car.submitted = submitted;
    }
    
    //private _updateCarsInLocalStorage() {
    //    localStorage.setItem('costTableCars', JSON.stringify(this.cars));
    //}
}
