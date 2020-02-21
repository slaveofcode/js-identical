# JS Identical
A simple library to check that JS/JSON value is identical each other (Typescript support). The implementation will ignore the order of array or key index.

> This module is a sub implementation of the [js-deep-equals](https://github.com/joelwass/js-deep-equals). Arrays are compared by creating a [Merkle Tree](https://en.wikipedia.org/wiki/Merkle_tree) out of the input and comparing the top level hashes. hashing is done using [murmur v3](https://en.wikipedia.org/wiki/MurmurHash).


## Usage

### Installation
    npm i js-identical

### Example
```
const isIdentical = require('js-identical')

const john1 = { name: 'John', age: 22, hobby: ['swimming', 'running', 'hiking'] }
const john2 = { age: 22, name: 'John', hobby: ['running', 'swimming', 'hiking'] }

const people1 = [
  {
    id: 1,
    name: 'Marry',
    hobby: ['singing', 'drawing', 'playing'],
    favouriteFoods:[
      {
        name: 'Gado gado',
        from: 'Indonesia'
      },
      {
        name: 'Rendang',
        from: 'Indonesia'
      },
      {
        name: 'Kentucky Fried Chicken',
        from: 'USA',
        variant: ['original', 'crispy', 'spicy']
      }
    ],
    age: 12
  },
  {
    id: 2,
    hobby: ['running', 'Dancing'],
    name: 'Rose',
    favouriteFoods:[
      {
        name: 'Rendang',
        from: 'Indonesia'
      },
      {
        name: 'Salad',
        from: 'USA'
      }
    ],
    age: 14
  }
]

const people2 = [
  {
    id: 1,
    name: 'Marry',
    hobby: ['drawing', 'singing', 'playing'],
    favouriteFoods:[
      {
        name: 'Rendang',
        from: 'Indonesia'
      },
      {
        name: 'Kentucky Fried Chicken',
        from: 'USA',
        variant: ['crispy', 'original', 'spicy']
      },
      {
        from: 'Indonesia',
        name: 'Gado gado'
      },
    ],
    age: 12
  },
  {
    id: 2,
    name: 'Rose',
    favouriteFoods:[
      {
        from: 'USA',
        name: 'Salad'
      },
      {
        name: 'Rendang',
        from: 'Indonesia'
      }
    ],
    age: 14,
    hobby: ['Dancing', 'running'],
  }
]

console.log(isIdentical(john1, john2)) // true
console.log(isIdentical(people1, people2)) // true
```

## License
MIT License

Copyright (c) 2020 Aditya Kresna

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
