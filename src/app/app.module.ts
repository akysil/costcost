import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CostComponent } from './components/cost/cost.component';
import { CostTableComponent } from './components/cost-table/cost-table.component';
import { CostCascadeComponent } from './components/cost-cascade/cost-cascade.component';

import { EdmundsService } from './services/edmunds.service';
import { EdmundsDefaultsService } from './services/edmunds-defaults.service';
import { CostFormValidatorsService } from './services/cost-form-validators.service';
import { CostCascadeService } from './services/cost-cascade.service';
import { CostCarService } from './services/cost-car.service';

@NgModule({
    declarations: [
        CostComponent,
        CostTableComponent,
        CostCascadeComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [
        EdmundsService,
        EdmundsDefaultsService,
        CostCascadeService,
        CostFormValidatorsService,
        CostCarService
    ],
    bootstrap: [
        CostComponent
    ]
})
export class AppModule {
}
