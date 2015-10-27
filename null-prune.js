(function (name, definition) {

    // AMD
    if (typeof define === 'function') {
        define(definition);
    }

    // Node.js
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition();
    }

    // Browser
    else {
        window[name] = definition();
    }
})('nullPrune', function () {
  function hasOwnProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property)
  }

  function isObject (input) {
    return input && (typeof input === 'object')
  }

  function keys (obj) {
    const ownKeys = []

    for (let key in obj) {
      if (hasOwnProperty(obj, key)) {
        ownKeys.push(key)
      }
    }

    return ownKeys
  }

  function nullPrune (inputObject, { objectKey, parentObject }) {
    keys(inputObject).forEach(function(key) {
      let node = inputObject[key]

      if (isObject(node)) {
        nullPrune(node, {
          objectKey: key,
          parentObject: inputObject
        })
      } else if (node == null) {
        delete inputObject[key]
      }
    })

    if (keys(inputObject).length === 0) {
      delete parentObject[objectKey]
    }

    return inputObject
  }

  return function(inputObject) {
    if (!isObject(inputObject)) {
      return inputObject
    }

    return nullPrune(inputObject, {})
  }
})
