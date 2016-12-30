import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {CostComponent} from './components/cost/cost.component';
import {CostTableComponent} from './components/cost-table/cost-table.component';

import {DataService} from './services/data.service';


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
  providers: [DataService],
  bootstrap: [CostComponent]
})
export class AppModule {
}
