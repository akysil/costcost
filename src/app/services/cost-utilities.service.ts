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

function collectionPercents$(values: any[]) {
    return Observable.of(values)
        .mergeMap(keys$)
        .mergeMap((key: string) => percents$(_.map(values, key)))
        .reduce(zipWithAdd, _.fill(Array(values.length), 0))
        .mergeMap(percents$);
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

function keys$(input: any): Observable<string> {
    return Observable.from(_([input]).flatten().map(Object.keys).flatten().uniq().value());
}

function percents$(props: number[]) {
    if (props.every((p: number) => _.isNumber(p) && p > 0)) {
        const percent = _.sum(props) / 100;
        return Observable.from(props)
            .map((prop: number) => _.round(prop / percent))
            .toArray();
    }
    return (props.every((p: number) => p === 0)) ?
        Observable.from(props).toArray() :
        Observable.throw(new Error('Not a number in percents$!'));
}

function stringify(...args: any[]) {
    return JSON.stringify.apply(null, args);
}

function zipWithAdd(...rest: any[]) {
    return _.zipWith.apply(null, [..._.takeWhile(rest, _.isArray), _.add]);
}

const uService = {
    acc,
    collectionPercents$,
    isTrue,
    findInCollection,
    findInEquipment,
    keys$,
    percents$,
    stringify,
    zipWithAdd
};

export default new Proxy(_, {
    get: (target: any, property: string) => {
        return uService[property] || target[property];
    }
});