import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';
import './style';

enableProdMode();

platformBrowser()
    .bootstrapModuleFactory(AppModuleNgFactory);