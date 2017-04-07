import * as _ from 'lodash';
import { Observable } from 'rxjs';

class CostUtilities {
    
    static findInCollection(collection: any[], key: string, value?: string) {
        return collection
            .find((item: any) => {
                return (value)
                    ? Object(item)[key] === value
                    : Object(item)[key];
            });
    }
    
    static findInEquipment(equipment: any[], name: string, attrName?: string) {
        const item = CostUtilities.findInCollection(equipment, 'name', name);
        return (attrName) ?
            CostUtilities.findInCollection(item.attributes, 'name', attrName).value :
            item;
    }
    
    static stringify(arg: any) {
        return JSON.stringify(arg);
    }
    
    static acc(acc: any, item: any) {
        
        if (_.isArray(acc)) {
            acc.push(item);
            return acc;
        }
        
        //if (_.isObject(acc)) {
        //    rest.forEach((item: any) => ({...acc, ...item}));
        //    return acc;
        //}
    
        return new Error(`Accumulator is not an Array!`);
    }
    
    static isTrue(arg: any) {
        return _.isBoolean(arg) && arg;
    }
    
    static get(object: any, path: string, defaultValue?: any) {
        return _.get(object, path, defaultValue);
    }
    
    static keys$(object: any): Observable<string> {
        return Observable.from(_u.keys(object));
    }
}

const _u: any = {..._, ...CostUtilities};

export {_u};