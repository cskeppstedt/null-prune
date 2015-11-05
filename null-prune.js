/* eslint-env amd */
(function (name, definition) {
  if (typeof define === 'function') {
    // AMD
    define(definition)
  } else if (typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = definition()
  } else {
    // Browser
    window[name] = definition()
  }
})('nullPrune', function () {
  function isObject (input) {
    return input && (typeof input === 'object')
  }

  function ownKeys (obj) {
    var key
    var ownKeys = []
    var hasOwnProperty = Object.prototype.hasOwnProperty

    for (key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        ownKeys.push(key)
      }
    }

    return ownKeys
  }

  function nullPrune (inputObject, context) {
    var objectKey = context.objectKey
    var parentObject = context.parentObject
    var keys = ownKeys(inputObject)
    var k
    var key
    var node

    for (k in keys) {
      key = keys[k]
      node = inputObject[key]

      if (isObject(node)) {
        nullPrune(node, {
          objectKey: key,
          parentObject: inputObject
        })
      } else if (node == null) {
        delete inputObject[key]
      }
    }

    if (parentObject && ownKeys(inputObject).length === 0) {
      delete parentObject[objectKey]
    }
  }

  return function (inputObject) {
    if (!isObject(inputObject)) {
      return inputObject
    }

    nullPrune(inputObject, {})
    return inputObject
  }
})
