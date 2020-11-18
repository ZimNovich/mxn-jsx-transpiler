# mxn-jsx-transpiler

Transpiles JSX to regular JavaScript

- ~6.1kb size
- ~2.5kb minified + gzipped

## What is transpiler?

> Transpiling is a specific term for taking source code written in one language and transforming into another language that has a similar level of abstraction.
>
> Transpilers are also known as source-to-source compilers. They take in a source code file and convert it to another source code file in some other language or a different version of the same language.

See [Wikipedia: Source-to-source compiler](https://en.wikipedia.org/wiki/Source-to-source_compiler).

## Usage

We suggest you to load the module via `require` until the stabilization of ES modules in Node.js:
```javascript
const transpile = require("mxn-jsx-transpiler");
```

Now you can transpile ("desugar") all JSX entries into regular JS calls as follows:
```javascript
let transpiled_code = transpile(code[, options]);
```

Where
 - `code` {String} - JS source code with JSX elements
 - `options` {Object} - options for JSX ⇒ JS transpilation

The default values for the `options` object are shown below:
```javascript
{
    factory: "h",         // factory function to use, e.g. `h`, `m`, `React.createElement`
    quotePropNames: true, // put property names into quotes
    indent: "    ",       // string to use for indentation
    lineEnd: "\n"         // string to use for line endings
}
```

Below is an advanced usage example:

```javascript
let transpiled_code = transpile(code, { factory: "React.createElement", quotePropNames: false });
```

Please note that this tool transpiles your source code from JSX to regular JavaScript. If you want to transform your JSX AST into JavaScript AST, check out [mxn-jsx-ast-transformer](https://github.com/ZimNovich/mxn-jsx-ast-transformer).

## License

This module is released under the MIT license.
