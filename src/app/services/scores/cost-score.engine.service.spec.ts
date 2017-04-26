import CostScoreEngineService from './cost-score.engine.service';

describe('CostScoreEngineService', () => {
    let service: any;
    let input1: any;
    let input2: any;
    
    beforeEach(() => {
        service = (<any>new CostScoreEngineService).__proto__.constructor;
        
        input1 = [
            {
                rust: {
                    mileage: "unlimited",
                    years: "1"
                }
            },
            {
                rust: {
                    mileage: "unlimited",
                    years: "2"
                }
            }
        ];
        
        input2 = [
            {
                rust: {
                    mileage: "50000",
                    years: "unlimited"
                },
                free_maintenance: {
                    mileage: "50000",
                    years: "4"
                }
            },
            {
                rust: {
                    mileage: "100000",
                    years: "unlimited"
                }
            }
        ];
    });
    
    it('.get', () => {
        expect(service.get).toBeDefined();
    });
});