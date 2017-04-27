import CostScoreEngineService from './cost-score.engine.service';

describe('CostScoreEngineService', () => {
    let service: any;
    
    beforeEach(() => {
        service = (<any>new CostScoreEngineService).__proto__.constructor;
    });
    
    it('.get', () => {
        expect(service.get).toBeDefined();
    });
});