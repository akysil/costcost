// More information: https://github.com/angular/protractor/blob/master/lib/config.ts

var SpecReporter = require('jasmine-spec-reporter');

exports.config = {
    allScriptsTimeout: 11000,
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },
    capabilities: {
        'browserName': 'chrome'
    },
    directConnect: true,
    baseUrl: 'http://localhost:8081/', // run on prod
    specs: ['../e2e/**/*.ts'],
    beforeLaunch: function() {
        require('ts-node').register({
            project: 'e2e'
        });
    },
    onPrepare: function() {
        jasmine.getEnv().addReporter(new SpecReporter());
    },
    useAllAngular2AppRoots: true
};