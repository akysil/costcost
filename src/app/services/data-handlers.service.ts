import { Injectable } from '@angular/core';

@Injectable()
export class DataHandlersService {
    
    public allMakes = (data: any): any[] => {
        return data.makes.map((make: any) => make.name);
    }
}
