import CostScoreComfortService from './cost-score.comfort.service';

describe('CostScoreComfortService', () => {
    let service: any;
    
    beforeEach(() => {
        service = (<any>new CostScoreComfortService).__proto__.constructor;
    });
    
    it('.get', () => {
        expect(service.get).toBeDefined();
    });
});