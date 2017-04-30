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
        
        reporters: ['karmaSimpleReporter', 'coverage', 'remap-coverage'],
        specReporter: karmaSpecReporterConfig,
        coverageReporter: {
            type: 'in-memory',
            includeAllSources: false
        },
        remapCoverageReporter: {
            'text-summary': null, // to show summary in console
            json: './coverage/report.json',
            html: './coverage'
        },
        
        colors: true,
        autoWatch: true,
        browsers: [
            // 'PhantomJS', // don't support Proxy polyfill
            'Chrome'
        ],
        singleRun: false,
        formatError: function(msg) {
            return msg.split('\n')[0].concat('\n');
            
            /* See:
            * https://github.com/karma-runner/karma/issues/2342
            * https://github.com/karma-runner/karma/issues/1411
            * https://github.com/karma-runner/karma/pull/2397 */
        },
    };
    
    config.set(_config);
};
