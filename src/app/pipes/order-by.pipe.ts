import { Pipe, PipeTransform } from '@angular/core';

/**
 * Sort items in array by given key
 * @example
 * *ngFor="let item of items | orderBy:['key']"
 */

@Pipe({
    name: "orderBy"
})
export class OrderBy implements PipeTransform {
    transform(collection: any[], keys: string[]): any[] {
        
        let newCollection = [...collection];
        
        keys.forEach(sortByKey);
    
        return newCollection;
        
        function sortByKey(key: string) {
            let k = (key.indexOf('-') === 0) ? key.slice(1) : key;
            newCollection.sort((a:any, b:any) => a[k] - b[k]);
            if (k != key) newCollection.reverse();
        }
    }
}