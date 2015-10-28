# null-prune

[![Build Status](https://travis-ci.org/cskeppstedt/null-prune.svg?branch=master)](https://travis-ci.org/cskeppstedt/null-prune)

A library to prune a JS object from nulls, recursively. This will leave a
compact object with no "empty" sub-objects.

## Usage

`nullPrune` is a function (exported with UMD, support for CommonJS, AMD or as a
global on `window`). Given a nested object, it will remove all keys that have
`null` or `undefined` values. After pruning those values, it will also remove
any sub-object that have no keys left.

The operation is destructive, the function will mutate the input object. If
that is not desired, clone the input before passing it to the function.

## Example

```
let input = {
  alpha: {
    x: null,
    y: undefined
  },
  beta: false
}

console.log('output:', nullPrune(input))
// output: { beta: false }
```
