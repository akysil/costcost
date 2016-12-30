import {HttpModule} from '@angular/http';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {CostTableComponent} from './cost-table.component';

import {DataEdmundsService} from '../../services/data-edmunds.service';
import {LocalStorageService} from '../../services/local-storage.service';

describe('CostTableComponent', () => {
  
  let component: CostTableComponent;
  let fixture: ComponentFixture<CostTableComponent>;
  let getNode: any;
  
  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      declarations: [CostTableComponent],
      imports: [HttpModule],
      providers: [
        DataEdmundsService,
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
    
    fixture = TestBed.createComponent(CostTableComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    getNode = (tag: string) => fixture.debugElement.nativeElement.querySelector(tag);
  }));
  
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have TABLE, THEAD, TBODY, TFOOT', () => {
    expect(['table', 'thead', 'tbody', 'tfoot']
      .every(tag => getNode(tag)))
      .toBe(true);
  });
});
