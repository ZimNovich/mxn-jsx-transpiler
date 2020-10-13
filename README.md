# mxn-jsx-transpiler

Transpiles JSX to regular JavaScript

- ~6.1kb size
- ~2.5kb minified + gzipped

## Usage

We suggest you to load the module via `require` until the stabilization of ES modules in Node.js:
```javascript
const transpile = require("mxn-jsx-transpiler");
```

Now you can transform all JSX entries into JS calls like this:
```javascript
let transpiled_code = transpile(code, { factory: "h" });
```

Where
 - `code` {String} - ESTree-compilant JSX AST to transform JSX in
 - `factory` {String} - factory function to use, e.g. `h`, `m`, `React.createElement`

Please note that this tool transpiles your source code from JSX to JS. If you want to transform your JSX AST into regular JavaScript, check out [mxn-jsx-ast-transformer](https://github.com/ZimNovich/mxn-jsx-ast-transformer).

## License

This module is released under the MIT license.
