import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { CostComponent } from './cost.component';

describe('CostComponent', () => {
    
    interface GetNode {
        (tag: string): {
            textContent: string;
        } | null;
    }
    
    let fixture: ComponentFixture<CostComponent>;
    let component: CostComponent;
    let getNode: GetNode;
    
    beforeEach(() => {
        
        TestBed.configureTestingModule({
            declarations: [
                CostComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        
        fixture = TestBed.createComponent(CostComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        
        getNode = (tag) => fixture.debugElement.nativeElement.querySelector(tag);
    });
    
    it('should create the component', async(() => {
        expect(component).toBeTruthy();
    }));
    
    it('should have as title Cost', async(() => {
        expect(component.title).toEqual('CostCost');
    }));
    
    it('should have H1, COST-TABLE', async(() => {
        expect(['h1', 'cost-table']
            .every(tag => Boolean(getNode(tag))))
            .toBe(true);
    }));
    
    it('should render title in a H1', async(() => {
        expect(getNode('h1').textContent).toContain('CostCost');
    }));
});
