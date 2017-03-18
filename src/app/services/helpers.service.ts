import { Injectable } from '@angular/core';

@Injectable()
export class HelpersService {
    
    constructor() {
        //
    }
    
    static findInCollection(collection: any[], key: string, value?: string) {
        return collection
            .find((item: any) => {
                return (value)
                    ? Object(item)[key] === value
                    : Object(item)[key];
            });
    }
    
    static findInEquipment(equipment: any[], name: string, attrName?: string) {
        const item = HelpersService.findInCollection(equipment, 'name', name);
        return (attrName) ?
            HelpersService.findInCollection(item.attributes, 'name', attrName).value :
            item;
    }
    
    static resetObject(object: any) {
        return (Object.keys(object).length) ? {} : object;
    }
}
