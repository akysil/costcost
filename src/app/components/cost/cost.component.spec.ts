import {HttpModule} from '@angular/http';
import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';

import {CostComponent} from './cost.component';
import {CostTableComponent} from '../cost-table/cost-table.component';

import {DataEdmundsService} from '../../services/data-edmunds.service';
import {LocalStorageService} from '../../services/local-storage.service';


describe('CostComponent', () => {
  
  interface Node {
    textContent: string;
  }
  interface GetNode {
    (tag: string): Node;
  }
  
  let fixture: ComponentFixture<CostComponent>;
  let component: CostComponent;
  let getNode: GetNode;
  
  beforeEach(() => {
    
    TestBed.configureTestingModule({
      declarations: [
        CostComponent,
        CostTableComponent
      ],
      imports: [HttpModule],
      providers: [
        {
          provide: DataEdmundsService,
          useValue: null
        },
        {
          provide: LocalStorageService,
          useValue: {
            getEdmundsAllMakes: () => {
              return new Observable((observer: any) => {
                observer.next({
                  makes: []
                });
                observer.complete();
              });
            }
          }
        }
      ]
    });
    
    TestBed.compileComponents();
    
    fixture = TestBed.createComponent(CostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
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
