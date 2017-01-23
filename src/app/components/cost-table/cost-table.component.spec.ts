import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { CostTableComponent } from './cost-table.component';

import { EdmundsService } from '../../services/edmunds.service';
import { HelpersService } from '../../services/helpers.service';

describe('CostTableComponent', () => {
    
    let component: CostTableComponent;
    let fixture: ComponentFixture<CostTableComponent>;
    let getNode: any;
    
    beforeEach(async(() => {
        
        TestBed.configureTestingModule({
            declarations: [CostTableComponent],
            providers: [
                {
                    provide: EdmundsService,
                    useValue: {
                        get: () => {
                            return new Observable((observer: any) => {
                                observer.next({
                                    makes: []
                                });
                                observer.complete();
                            });
                        }
                    }
                },
                HelpersService
            ],
            imports: [ReactiveFormsModule]
        });
        
        fixture = TestBed.createComponent(CostTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        
        getNode = (tag: string) => fixture.debugElement.nativeElement.querySelector(tag);
    }));
    
    it('should create the component', async(() => {
        expect(component).toBeTruthy();
    }));
    
    //it('should have TABLE, THEAD, TBODY, TFOOT', async(() => {
    //    component.makes = [{name: 'test'}];
    //    fixture.detectChanges();
    //    expect(['table', 'thead', 'tbody', 'tfoot']
    //        .every(tag => getNode(tag)))
    //        .toBe(true);
    //}));
});
