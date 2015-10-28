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
  function hasOwnProperty (obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property)
  }

  function isObject (input) {
    return input && (typeof input === 'object')
  }

  function keys (obj) {
    var key
    var ownKeys = []

    for (key in obj) {
      if (hasOwnProperty(obj, key)) {
        ownKeys.push(key)
      }
    }

    return ownKeys
  }

  function nullPrune (inputObject, context) {
    var objectKey = context.objectKey
    var parentObject = context.parentObject

    keys(inputObject).forEach(function (key) {
      var node = inputObject[key]

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
  }

  return function (inputObject) {
    if (!isObject(inputObject)) {
      return inputObject
    }

    nullPrune(inputObject, {})
    return inputObject
  }
})
