import CostScoreTransmissionService from './cost-score.transmission.service';

describe('CostScoreTransmissionService', () => {
    let service: any;
    
    beforeEach(() => {
        service = (<any>new CostScoreTransmissionService).__proto__.constructor;
    });
    
    it('.get', () => {
        expect(service.get).toBeDefined();
    });
});