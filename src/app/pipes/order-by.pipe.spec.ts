import { OrderBy } from './order-by.pipe';
import _u from '../services/cost-utilities.service';

describe('OrderByPipe', () => {
    let pipe: OrderBy;
    let collection: any[];
    
    beforeEach(() => {
        pipe = new OrderBy();
        
        collection = [
            {key1: 1, key2: 2},
            {key1: 3, key2: 1},
            {key1: 2, key2: 3}
        ]
    });
    
    it('should sort ASC', () => {
        expect(_u.map(pipe.transform(collection, ['key1']), 'key1'))
            .toEqual([1, 2, 3]);
    });
    
    it('should sort DESC', () => {
        expect(_u.map(pipe.transform(collection, ['-key1']), 'key1'))
            .toEqual([3, 2, 1]);
    });
    
    it('should sort ASC and DESC', () => {
        expect(_u.map(pipe.transform(collection, ['key1', '-key2']), 'key1'))
            .toEqual([2, 1, 3]);
    });
});