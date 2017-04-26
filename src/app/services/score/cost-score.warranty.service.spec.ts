import CostScoreWarrantyService from './cost-score.warranty.service';

describe('CostScoreWarrantyService', () => {
    let service: any;
    let input1: any;
    let input2: any;
    
    beforeEach(() => {
        service = (<any>new CostScoreWarrantyService).__proto__.constructor;
    
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
    
        service.get(input1).subscribe((data: any) => {
            expect(data).toEqual([42, 58]);
        });
    
        service.get(input2).subscribe((data: any) => {
            expect(data).toEqual([59, 41]);
        });
    });
});