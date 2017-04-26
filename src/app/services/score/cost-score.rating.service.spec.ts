import CostScoreRatingService from './cost-score.warranty.service';

describe('CostScoreRatingService', () => {
    let service: any;
    
    beforeEach(() => {
        service = (<any>new CostScoreRatingService).__proto__.constructor;
    });
    
    it('.get', () => {
        expect(service.get).toBeDefined();
    });
});