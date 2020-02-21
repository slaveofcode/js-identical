import { v3 as hash } from 'murmurhash'

const EMPTY_OBJECT = '__empty__obj'
const EMPTY_ARRAY = '__empty__arr'

class Node {
  public children: any
  public hash: number
  constructor() {
    this.children = []
    this.hash = 0
  }
}

const hasher = (thing: any, prefix: string = '') => {
  const stringThing = prefix + (typeof thing) + '::' + thing
  return hash(stringThing)
}

const combineHashes = (parentHash: any, child: any) => {
  /* tslint:disable:no-bitwise */
  return (parentHash + child.hash) & 0xFFFFFFFF
}

const newNode = (thing: any, prefix: string) => {
  const node = new Node()
  node.hash = hasher(thing, prefix)
  return node
}

const createTree = (currNode: Node, currentInput: any, prefix: string = '') => {
  const isObject = typeof currentInput === 'object'
  const isNil = currentInput === null || typeof currentInput === 'undefined'
  const isArray = Array.isArray(currentInput)
  const keys: any = !isNil ? Object.keys(currentInput) : []

  // we're at a weird value
  if (currentInput instanceof Date || currentInput instanceof RegExp) {
    return newNode(currentInput, prefix)
  }

  // if we're at a value
  if (!isObject && !isArray) {
    return newNode(currentInput, prefix)
  }

  // if we're at an iterable
  if (!keys.length) {
    return isArray ? newNode(EMPTY_ARRAY, prefix) : newNode(EMPTY_OBJECT, prefix)
  }
  for (const key of keys) {
    let pfx
    if (!isArray && isObject) { // if we're dealing with an object prefix the key
      pfx = key
    }

    const node = createTree(new Node(), currentInput[key], pfx)
    currNode.children.push(node)
  }
  // iterable's hash is combined hash of all children
  const combined = currNode.children.reduce(combineHashes, 0)
  currNode.hash = hasher(combined)
  return currNode
}

const createFinalHash = (input: any) => {
  const tree = createTree(new Node(), input)
  return tree.hash
}

export const compare = (a: any, b: any) => {
  if (a && b && ((Array.isArray(a) && Array.isArray(b)) || (typeof a === 'object' && typeof b === 'object')) && (a.length === b.length)) {
    return createFinalHash(a) === createFinalHash(b)
  }
  return false
}