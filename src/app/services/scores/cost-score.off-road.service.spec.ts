import CostScoreOffRoadService from './cost-score.off-road.service';

describe('CostScoreOffRoadService', () => {
    let service: any;
    
    beforeEach(() => {
        service = (<any>new CostScoreOffRoadService).__proto__.constructor;
    });
    
    it('.get', () => {
        expect(service.get).toBeDefined();
    });
});