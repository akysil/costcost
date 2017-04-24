import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { CostTableComponent } from './cost-table.component';

describe('CostTableComponent', () => {
    
    let component: CostTableComponent;
    let fixture: ComponentFixture<CostTableComponent>;
    let getNode: any;
    
    beforeEach(async(() => {
        
        TestBed.configureTestingModule({
            declarations: [CostTableComponent],
            providers: [
            
            ],
            imports: [ReactiveFormsModule]
        });
        
        fixture = TestBed.createComponent(CostTableComponent);
        component = fixture.componentInstance;
        component.data = Observable.of([]);
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
