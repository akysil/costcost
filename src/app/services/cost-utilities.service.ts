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

function keys$(input: any): Observable<string> {
    return Observable.from(_([input]).flatten().map(Object.keys).flatten().uniq().value());
}

function percents$(props: number[]): Observable<any> {
    if (_.every(props, _.isNumber)) {
        return percentsNumbers$(props);
    } else if (_.every(props, _.isObject)) { // TODO: isQualifiedObject
        return percentsObject$(props);
    } else if (_.some(props, _.isNull)) {
        return Observable.of(_.fill(props, 0));
    } else {
        return Observable.throw(new Error('Not valid for percents$!'));
    }
}

function percentsNumbers$(props: number[]) {
    if (props.every((p: number) => p === 0)) {
        return Observable.from(props).toArray();
    } else {
        const percent = _.sum(props) / 100;
        return Observable.from(props)
            .map((prop: number) => _.round(prop / percent))
            .toArray();
    }
}

function percentsObject$(values: any[]) {
    return Observable.of(values)
        .mergeMap(keys$)
        .mergeMap((key: string) => percentsNumbers$(_.map(values, key)))
        .reduce(zipWithAdd, _.fill(Array(values.length), 0))
        .mergeMap(percentsNumbers$);
}

function stringify(...args: any[]) {
    return JSON.stringify.apply(null, args);
}

function zipWithAdd(...rest: any[]) {
    return _.zipWith.apply(null, [..._.takeWhile(rest, _.isArray), _.add]);
}

const uService = {
    acc,
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