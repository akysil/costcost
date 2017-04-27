import CostScoreRoominessService from './cost-score.roominess.service';

describe('CostScoreRoominessService', () => {
    let service: any;
    
    beforeEach(() => {
        service = (<any>new CostScoreRoominessService).__proto__.constructor;
    });
    
    it('.get', () => {
        expect(service.get).toBeDefined();
    });
});