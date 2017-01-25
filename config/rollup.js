import 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify';
import filesize    from 'rollup-plugin-filesize';
import scss        from 'rollup-plugin-scss';

export default {
    entry: 'src/main.aot.js',
    dest: 'dist/app.js', // output a single application bundle
    sourceMap: false,
    format: 'iife',
    plugins: [
        nodeResolve({jsnext: true, module: true}),
        commonjs({ // convert CommonJS modules to ES6
            include: 'node_modules/rxjs/**', // the only lib not in typescript
        }),
        uglify(),
        filesize(),
        scss() // output compiled styles to app.css
    ],
    onwarn: function (message) { // suppress 'this' error message
        if (/The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten./.test(message)) {
            return;
        }
        console.error(message);
    },
}
