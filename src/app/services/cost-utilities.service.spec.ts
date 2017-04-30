import _u from './cost-utilities.service';
import { every } from 'rxjs/operator/every';

describe('_u: ', () => {
    let service: any;
    let input: any;
    
    beforeEach(() => {
        service = _u;
    });
    
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    
    it('invertPercents$ should be defined', () => {
        expect(service.invertPercents$).toBeDefined();
    });
    
    it('invertPercents$ should invert percents', () => {
        service.invertPercents$([10, 90]).subscribe((data: number[]) => {
            expect(data).toEqual([90, 10]);
        });
    });
    
    it('isQualifiedProperty should be defined', () => {
        expect(service.isQualifiedProperty).toBeDefined();
    });
    
    it('isQualifiedProperty should qualify number', () => {
        expect([0, 1]
            .every(service.isQualifiedProperty)).toBe(true);
    
        expect([null, [], {}, '2', undefined]
            .some(service.isQualifiedProperty)).toBe(false);
    });
    
    it('isQualifiedProperty should qualify {[key]: number}', () => {
        expect([{a: 0}, {a: 1, b: 2}]
            .every(service.isQualifiedProperty)).toBe(true);
    
        expect([null, [], {}, '2', undefined].map((a: any) => ({a}))
            .some(service.isQualifiedProperty)).toBe(false);
    });
    
    it('percents$ should be defined', () => {
        expect(service.percents$).toBeDefined();
    });
    
    it('percents$ should score numbers', () => {
        service.percents$([1, 2]).subscribe((data: number[]) => {
            expect(data).toEqual([33, 67]);
        });
        
        service.percents$([1, 2, 3]).subscribe((data: number[]) => {
            expect(data).toEqual([17, 33, 50]);
        });
        
        service.percents$([3, 1, 4, 2]).subscribe((data: number[]) => {
            expect(data).toEqual([30, 10, 40, 20]);
        });
    
        input = [{mileage: 50000, years: 4}, {mileage: 50000, years: 8}];
        service.percents$(input).subscribe((data: any[]) => {
            expect(data).toEqual([42, 59]);
        });
    });
    
    it('percents$ should give back nulls', () => {
        service.percents$([0, 0]).subscribe((data: number[]) => {
            expect(data).toEqual([0, 0]);
        });
    });
    
    it('percents$ should return error', () => {
        service.percents$([1, '1']).subscribe(null, ({originalStack}: any) => {
            expect(originalStack).toMatch(/Not valid for percents\$!/);
        });
    });
});