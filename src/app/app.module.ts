import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpInterceptorModule } from 'ng-http-interceptor';

import { CostComponent } from './components/cost/cost.component';
import { CostTableComponent } from './components/cost-table/cost-table.component';
import { CostPreferencesComponent } from './components/cost-preferences/cost-preferences.component';
import { CostCredentialsComponent } from './components/cost-credentials/cost-credentials.component';
import { CostCredentialComponent } from './components/cost-credential/cost-credential.component';

import { EdmundsService } from './services/edmunds.service';
import { EdmundsDefaultsService } from './services/edmunds-defaults.service';
import { CostFormValidatorsService } from './services/cost-form-validators.service';
import { CostCascadeService } from './services/cost-cascade.service';
import { PropertiesService } from './services/properties.service';
import { ScoresService } from './services/cost-scores.service';

import { OrderBy } from './pipes/order-by.pipe';

@NgModule({
    declarations: [
        CostComponent,
        CostPreferencesComponent,
        CostCredentialsComponent,
        CostCredentialComponent,
        CostTableComponent,
        OrderBy
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        HttpInterceptorModule
    ],
    providers: [
        EdmundsService,
        EdmundsDefaultsService,
        CostCascadeService,
        CostFormValidatorsService,
        PropertiesService,
        ScoresService
    ],
    bootstrap: [
        CostComponent
    ]
})
export class AppModule {
}
