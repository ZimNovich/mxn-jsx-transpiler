#!/usr/bin/env node
/*
  Copyright (C) 2020 Ilya Zimnovich <zimnovich@gmail.com>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

var fs, system, transpile, options, fnames, count;

if (typeof transpile === "undefined") {
    // PhantomJS can only require() relative files
    if (typeof phantom === "object") {
        fs = require("fs");
        system = require("system");
        transpile = require("./mxn-jsx-transpiler");
    } else if (typeof require === "function") {
        fs = require("fs");
        transpile = require("mxn-jsx-transpiler");
    } else if (typeof load === 'function') {
        try {
            load("mxn-jsx-transpiler.js");
        } catch (e) {
            load("../mxn-jsx-transpiler.js");
        }
    }
}

function showUsage() {
    console.log("Usage:");
    console.log("  jsx-transpile [options] file.js");
    console.log();
    console.log("Available options:");
    console.log("  --factory=...  Set the entry creation factory e.g. \"h\", \"m\", \"React.createElement\" (defaults to \"h\")");
    console.log("  -v, --version  Print program version");
    console.log();
    process.exit(1);
}

if (process.argv.length <= 2) {
    showUsage();
}

options = {
    factory: "h"
};

fnames = [];

process.argv.splice(2).forEach(function (entry) {

    if (entry === "-h" || entry === "--help") {
        showUsage();
    }
    else if (entry === "-v" || entry === "--version") {
        console.log("MXN JSX Transpiler v" + transpile.version);
        console.log();
        process.exit(0);
    }
    else if (entry.slice(0, 10) === "--factory=") {
        options.factory = entry.slice(10);
    }
    else if (entry.slice(0, 2) === "--") {
        console.log("Error: unknown option " + entry + ".");
        process.exit(1);
    }
    else {
        fnames.push(entry);
    }
});

if (fnames.length === 0) {
    console.log("Error: no input file.");
    process.exit(1);
}

count = 0;
fnames.forEach(function (fname) {
    var destname, code, timestamp;
    try {
        destname  = fname.substr(0, fname.lastIndexOf(".")) + ".jsx.js";
        code      = fs.readFileSync(fname, "utf-8");
        timestamp = Date.now();

        transpiled = transpile(code, options);
        fs.writeFileSync(destname, transpiled, { encoding: "utf8" });

        console.log("Transpiled file %j in %j msec", fname, Date.now() - timestamp);
    }
    catch (e) {
        ++count;
        console.log("Error: " + e.message);
    }
});

if (count > 0) {
    process.exit(1);
}

if (count === 0 && typeof phantom === "object") {
    process.exit(0);
}
