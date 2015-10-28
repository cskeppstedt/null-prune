/* eslint-env node, mocha */

import { expect } from 'chai'
import nullPrune from '../null-prune'

describe('null-prune', function () {
  it('should be a function', function () {
    expect(nullPrune).to.be.a('function')
  })

  it('should return the input object if not an object', function () {
    const input = 123
    const expected = 123

    expect(nullPrune(input)).to.eql(expected)
  })

  it('should be destructive (modify input object)', function () {
    const input = {
      a: 1,
      b: null,
      c: 3
    }

    const expected = {
      a: 1,
      c: 3
    }

    const output = nullPrune(input)

    expect(output).to.eql(expected)
    expect(output === input).to.be.true
  })

  it('should prune a null leaf among non-null siblings', function () {
    const input = {
      a: 1,
      b: null,
      c: 3
    }

    const expected = {
      a: 1,
      c: 3
    }

    expect(nullPrune(input)).to.eql(expected)
  })

  it('should prune a node with only null-leafs', function () {
    const input = {
      a: 1,
      c: {
        x: null,
        y: null
      }
    }

    const expected = {
      a: 1
    }

    expect(nullPrune(input)).to.eql(expected)
  })

  it('should prune a chain of nodes with null-leafs', function () {
    const input = {
      c: {
        x: {
          alpha: null
        },
        y: true
      },
      d: false
    }

    const expected = {
      c: {
        y: true
      },
      d: false
    }

    expect(nullPrune(input)).to.eql(expected)
  })
})
