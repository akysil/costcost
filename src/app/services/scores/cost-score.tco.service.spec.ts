import CostScoreTcoService from './cost-score.tco.service';

describe('CostScoreTcoService', () => {
    let service: any;
    
    beforeEach(() => {
        service = (<any>new CostScoreTcoService).__proto__.constructor;
    });
    
    it('.get', () => {
        expect(service.get).toBeDefined();
    });
});