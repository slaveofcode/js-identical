import { expect } from 'chai'
import { compare } from './index'
import 'mocha';

describe('Compare JSON', () => {
  it('should be able to compare single Object', () => {
    const jsonSource = {
      name: 'John',
      age: 17,
      canSwim: true
    }
    const jsonDest = {
      name: 'John',
      age: 17,
      canSwim: true
    }

    expect(compare(jsonSource, jsonDest)).to.equal(true)
  })

  it('should be able to compare single Object but extra props on 2nd', () => {
    const jsonSource = {
      name: 'John',
      age: 17,
      canSwim: true
    }
    const jsonDest = {
      name: 'John',
      age: 17,
      canSwim: true,
      canFly: false
    }

    expect(compare(jsonSource, jsonDest)).to.equal(true)
  })

  it('should fail in compare single Object with diffs on value', () => {
    const jsonSource = {
      name: 'John',
      age: 17,
      canSwim: true
    }
    const jsonDest = {
      name: 'John',
      age: 17,
      canSwim: false
    }

    expect(compare(jsonSource, jsonDest)).to.equal(false)
  })

  it('should be able to compare array single Object', () => {
    const jsonSource = [{
      name: 'John',
      age: 17,
      canSwim: true
    }]
    const jsonDest = [{
      name: 'John',
      age: 17,
      canSwim: true
    }]

    expect(compare(jsonSource, jsonDest)).to.equal(true)
  })

  it('should be able to compare array multi Object', () => {
    const jsonSource = [{
      name: 'John',
      age: 17,
      canSwim: true
    }, {
      name: 'Doe',
      age: 28,
      canSwim: false
    }]
    const jsonDest = [{
      name: 'John',
      age: 17,
      canSwim: true
    }, {
      name: 'Doe',
      age: 28,
      canSwim: false
    }]

    expect(compare(jsonSource, jsonDest)).to.equal(true)
  })

  it('should be able to compare array multi Object with different order', () => {
    const jsonSource = [{
      name: 'John',
      age: 17,
      canSwim: true
    }, {
      name: 'Doe',
      age: 28,
      canSwim: false
    }]
    const jsonDest = [{
      name: 'Doe',
      age: 28,
      canSwim: false
    }, {
      name: 'John',
      age: 17,
      canSwim: true
    }]

    expect(compare(jsonSource, jsonDest)).to.equal(true)
  })

  it('should be able to compare array multi Object with primitive values', () => {
    const jsonSource = ['read', 'write']
    const jsonDest = ['write', 'read']

    expect(compare(jsonSource, jsonDest)).to.equal(true)
  })

  // tslint:disable-next-line: max-line-length
  it('should be able to compare array multi Object with primitive values but unsatisfy array count', () => {
    const jsonSource = ['read', 'write', 'write']
    const jsonDest = ['write', 'read']

    const jsonSource2 = ['read', 'write']
    const jsonDest2 = ['write', 'read', 'update']

    expect(compare(jsonSource, jsonDest)).to.equal(false)
    expect(compare(jsonSource2, jsonDest2)).to.equal(true)
  })

  it('should be able to compare array with mixed values', () => {
    const jsonSource = ['read', { weak: true }, 'write']
    const jsonDest = ['write', 'read', { weak: true }]

    const jsonSource2 = ['read', { weak: true }, 'write']
    const jsonDest2 = ['write', { weak: true }]

    const jsonSource3 = ['read', { weak: true }, [ { fly: true } ], 'write']
    const jsonDest3 = ['write', { weak: true }, [ { fly: true}], 'read']

    const jsonSource4 = ['read', { weak: true }, [ { fly: false } ], 'write']
    const jsonDest4 = ['write', { weak: true }, [ { fly: true}], 'read']

    const jsonSource5 = ['read', { weak: true }, [ { fly: false } ], [12, 'foo'], 'write']
    const jsonDest5 = ['write', { weak: true }, [ { fly: false }, { fly: true } ], 'read', [12, 'foo', 45]]

    expect(compare(jsonSource, jsonDest)).to.equal(true)
    expect(compare(jsonSource2, jsonDest2)).to.equal(false)
    expect(compare(jsonSource3, jsonDest3)).to.equal(true)
    expect(compare(jsonSource4, jsonDest4)).to.equal(false)
    expect(compare(jsonSource5, jsonDest5)).to.equal(true)
  })
})