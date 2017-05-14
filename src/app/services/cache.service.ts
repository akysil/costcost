import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
    
    constructor() {
    }
    
    get get() {
        return (key: string) => {
            const value = localStorage.getItem(key);
            return (value) ? JSON.parse(value) : value;
        }
    }
    
    get set() {
        return (key: string, value: any) => {
            return localStorage.setItem(key, JSON.stringify(value));
        }
    }
}
