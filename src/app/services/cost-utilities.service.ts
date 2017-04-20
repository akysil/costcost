import * as lodash from 'lodash';
import { Observable } from 'rxjs';

const _ = lodash['__moduleExports'] || lodash; // for ng compiler compatibility (rollup-plugin-commonjs)

function acc(acc: any, item: any) {
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

function isTrue(arg: any) {
    return _.isBoolean(arg) && arg;
}

function findInCollection(collection: any[], key: string, value?: string) {
    return collection
        .find((item: any) => {
            return (value)
                ? Object(item)[key] === value
                : Object(item)[key];
        });
}

function findInEquipment(equipment: any[], name: string, attrName?: string) {
    const item = findInCollection(equipment, 'name', name);
    return (attrName) ?
        findInCollection(item.attributes, 'name', attrName).value :
        item;
}

function keys$(object: any): Observable<string> {
    return Observable.from(_.keys(object));
}

function stringify(...args: any[]) {
    return JSON.stringify.apply(null, args);
}

export default new Proxy({
    acc,
    isTrue,
    findInCollection,
    findInEquipment,
    keys$,
    stringify
}, {
    get: (target: any, property: string) => {
        return target[property] || _[property];
    }
});