# mxn-jsx-transpiler

Transpiles JSX to regular JavaScript

- ~6.1kb size
- ~2.5kb minified + gzipped

> Transpilers are also known as source-to-source compilers. They take in a source code file and convert it to another source code file in some other language or a different version of the same language.

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

Please note that this tool transpiles your source code from JSX to regular JS. If you want to transform your JSX AST into JavaScript AST, check out [mxn-jsx-ast-transformer](https://github.com/ZimNovich/mxn-jsx-ast-transformer).

## License

This module is released under the MIT license.
