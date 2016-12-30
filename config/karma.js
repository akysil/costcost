var webpackConfig = require('./webpack-test');
var karmaSpecReporterConfig = require('./karma-spec-reporter');

module.exports = function(config) {
    var _config = {
        basePath: '',
        
        frameworks: ['jasmine'],
        
        files: [
            {
                pattern: './karma-shim.js',
                watched: false
            }
        ],
        
        preprocessors: {
            './karma-shim.js': ['coverage', 'webpack', 'sourcemap']
        },
        
        webpack: webpackConfig,
        
        webpackMiddleware: {
            stats: 'normal'
        },
        
        webpackServer: {
            noInfo: false,
            stats: true
        },
        
        reporters: ['karmaSimpleReporter', 'coverage', 'remap-coverage'],
        specReporter: karmaSpecReporterConfig,
        coverageReporter: {
            type: 'in-memory',
            includeAllSources: true
        },
        remapCoverageReporter: {
            'text-summary': null, // to show summary in console
            json: './coverage/report.json',
            html: './coverage'
        },
        
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    };
    
    config.set(_config);
};
