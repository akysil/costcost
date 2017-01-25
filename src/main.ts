import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import './style.css';

platformBrowserDynamic()
    .bootstrapModule(AppModule);