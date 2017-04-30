import CostScoreTmvService from './cost-score.tmv.service';

describe('CostScoreTmvService', () => {
    let service: any;
    
    beforeEach(() => {
        service = (<any>new CostScoreTmvService).__proto__.constructor;
    });
    
    it('.get', () => {
        expect(service.get).toBeDefined();
    });
});