import { browser, element, by } from 'protractor';

describe('Demo App', function () {
	
	beforeEach(() => {
		browser.get('/');
	});
	
	it('should have a header /Hello World!/', function () {
		expect<any>(element(by.tagName('h1')).getText()).toEqual('Hello World!');
	});
});