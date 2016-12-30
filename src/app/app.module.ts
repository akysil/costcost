import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {CostComponent} from './components/cost/cost.component';
import {CostTableComponent} from './components/cost-table/cost-table.component';

import {DataEdmundsService} from './services/data-edmunds.service';
import {LocalStorageService} from './services/local-storage.service'


@NgModule({
  declarations: [
    CostComponent,
    CostTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataEdmundsService, LocalStorageService],
  bootstrap: [CostComponent]
})
export class AppModule {
}
