import { async, getTestBed, TestBed } from '@angular/core/testing';

import { ScoreService } from './score.service';
import _u from './cost-utilities.service';

describe('ScoreService', () => {
    let testbed: TestBed;
    let service: ScoreService;
    let cars: any[];
    
    beforeEach(async(() => {
        
        TestBed.configureTestingModule({
            providers: [
                ScoreService
            ]
        });
        
        testbed = getTestBed();
        service = testbed.get(ScoreService);
        
        cars = [
            {
                scores: {
                    first: 1,
                    second: 2
                }
            },
            {
                scores: {
                    first: 8,
                    second: 15
                }
            }
        ];
        
    }));
    
    it('should be defined', async(() => {
        expect(service).toBeDefined();
    }));
    
    it('should compute score from scores and set "score" property', () => {
        service.apply(cars).subscribe((data: any[]) => {
            expect(_u.map(data, 'score')).toEqual([3, 23]);
        });
    });
});