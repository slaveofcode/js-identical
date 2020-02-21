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

  it('should be able to compare single Object with random order', () => {
    const jsonSource = {
      name: 'John',
      age: 17,
      canSwim: true
    }
    const jsonDest = {
      age: 17,
      name: 'John',
      canSwim: true
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
    const jsonDest = ['write', 'read', 'write']

    const jsonSource2 = ['read', 'update', 'write']
    const jsonDest2 = ['write', 'read', 'update']

    expect(compare(jsonSource, jsonDest)).to.equal(true)
    expect(compare(jsonSource2, jsonDest2)).to.equal(true)
  })

  it('should be able to compare array with mixed values', () => {
    const jsonSource = ['read', { weak: true }, 'write']
    const jsonDest = ['write', 'read', { weak: true }]

    const jsonSource2 = ['read', { weak: true }, 'write']
    const jsonDest2 = ['write', { weak: true }]

    const jsonSource3 = ['read', { weak: true }, [{ fly: true }], 'write']
    const jsonDest3 = ['write', { weak: true }, [{ fly: true }], 'read']

    const jsonSource4 = ['read', { weak: true }, [{ fly: false }], 'write']
    const jsonDest4 = ['write', { weak: true }, [{ fly: true }], 'read']

    const jsonSource5 = [
      'read',
      { weak: true },
      [{ fly: false }, { fly: true }],
      [12, 'foo'],
      'write'
    ]
    const jsonDest5 = [
      'write',
      { weak: true },
      [{ fly: false }, { fly: true }],
      'read',
     [12, 'foo']
    ]

    expect(compare(jsonSource, jsonDest)).to.equal(true)
    expect(compare(jsonSource2, jsonDest2)).to.equal(false)
    expect(compare(jsonSource3, jsonDest3)).to.equal(true)
    expect(compare(jsonSource4, jsonDest4)).to.equal(false)
    expect(compare(jsonSource5, jsonDest5)).to.equal(true)
  })

  it('should be able to compare with large ordered json', () => {
    const jsonSource = [
      {
        '_id': '5e4e7b165b00392b3a58f987',
        'index': 0,
        'guid': '1e4652ab-9349-4e17-bf97-ddf1d414047f',
        'isActive': true,
        'latitude': -67.37599,
        'longitude': -134.899322,
        'tags': [
          'mollit',
          'ipsum',
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Mayer Pacheco'
          },
          {
            'id': 1,
            'name': 'Kari Mercer'
          },
          {
            'id': 2,
            'name': 'Diana Pace'
          }
        ],
        'greeting': 'Hello, Phoebe Love! You have 10 unread messages.',
        'favoriteFruit': 'banana'
      },
      {
        '_id': '5e4e7b164db28483cfe4f786',
        'isActive': false,
        'balance': '$1,761.52',
        'picture': 'http://placehold.it/32x32',
        'age': 24,
        'eyeColor': 'green',
        'longitude': -145.447211,
        'tags': [
          'sint',
          'culpa',
          'qui'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Madelyn Jenkins'
          },
          {
            'id': 1,
            'name': 'Irene Cantu'
          }
        ],
        'greeting': 'Hello, Evangeline Hudson! You have 2 unread messages.'
      },
      {
        '_id': '5e4e7b16fc483429032b47c6',
        'tags': [
          'qui',
          'dolore',
          'dolor',
          'duis',
          'nulla',
          'deserunt',
          'aliqua'
        ],
        'friends': [
          {
            'id': 2,
            'name': 'Delaney Salazar'
          }
        ],
        'greeting': 'Hello, Shields Day! You have 7 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        'latitude': -24.924509,
        'longitude': -16.273549,
        'tags': [
          'elit',
          'do',
          'aute',
          'id',
          'id',
          'sint',
          'ad'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Barbara Campbell'
          },
          {
            'id': 2,
            'name': 'Adrienne Rowe'
          }
        ]
      },
      {
        '_id': '5e4e7b16ef2735ac1a25746c',
        'index': 4,
        'guid': '3202053d-25a7-47cf-8a2f-40e5e680634f',
        'isActive': true,
        'balance': '$3,498.35',
        'picture': 'http://placehold.it/32x32',
        'age': 32,
        'eyeColor': 'blue',
        'name': 'Sanford Martin',
        'registered': '2018-02-11T05:50:04 -07:00',
        'latitude': 59.125674,
        'tags': [],
        'friends': [
          {
            'id': 0,
            'name': 'Russell Roy'
          },
          {
            'id': 1,
            'name': 'Herman Conway'
          },
          {
            'id': 2,
            'name': 'Leanna Webster'
          }
        ],
        'greeting': 'Hello, Sanford Martin! You have 5 unread messages.',
        'favoriteFruit': 'banana'
      }
    ]

    const jsonDest = [
      {
        '_id': '5e4e7b165b00392b3a58f987',
        'index': 0,
        'guid': '1e4652ab-9349-4e17-bf97-ddf1d414047f',
        'isActive': true,
        'latitude': -67.37599,
        'longitude': -134.899322,
        'tags': [
          'mollit',
          'ipsum',
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Mayer Pacheco'
          },
          {
            'id': 1,
            'name': 'Kari Mercer'
          },
          {
            'id': 2,
            'name': 'Diana Pace'
          }
        ],
        'greeting': 'Hello, Phoebe Love! You have 10 unread messages.',
        'favoriteFruit': 'banana'
      },
      {
        '_id': '5e4e7b164db28483cfe4f786',
        'isActive': false,
        'balance': '$1,761.52',
        'picture': 'http://placehold.it/32x32',
        'age': 24,
        'eyeColor': 'green',
        'longitude': -145.447211,
        'tags': [
          'sint',
          'culpa',
          'qui'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Madelyn Jenkins'
          },
          {
            'id': 1,
            'name': 'Irene Cantu'
          }
        ],
        'greeting': 'Hello, Evangeline Hudson! You have 2 unread messages.'
      },
      {
        '_id': '5e4e7b16fc483429032b47c6',
        'tags': [
          'qui',
          'dolore',
          'dolor',
          'duis',
          'nulla',
          'deserunt',
          'aliqua'
        ],
        'friends': [
          {
            'id': 2,
            'name': 'Delaney Salazar'
          }
        ],
        'greeting': 'Hello, Shields Day! You have 7 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        'latitude': -24.924509,
        'longitude': -16.273549,
        'tags': [
          'elit',
          'do',
          'aute',
          'id',
          'id',
          'sint',
          'ad'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Barbara Campbell'
          },
          {
            'id': 2,
            'name': 'Adrienne Rowe'
          }
        ]
      },
      {
        '_id': '5e4e7b16ef2735ac1a25746c',
        'index': 4,
        'guid': '3202053d-25a7-47cf-8a2f-40e5e680634f',
        'isActive': true,
        'balance': '$3,498.35',
        'picture': 'http://placehold.it/32x32',
        'age': 32,
        'eyeColor': 'blue',
        'name': 'Sanford Martin',
        'registered': '2018-02-11T05:50:04 -07:00',
        'latitude': 59.125674,
        'tags': [],
        'friends': [
          {
            'id': 0,
            'name': 'Russell Roy'
          },
          {
            'id': 1,
            'name': 'Herman Conway'
          },
          {
            'id': 2,
            'name': 'Leanna Webster'
          }
        ],
        'greeting': 'Hello, Sanford Martin! You have 5 unread messages.',
        'favoriteFruit': 'banana'
      }
    ]

    expect(compare(jsonSource, jsonDest)).to.equal(true)
  })

  it('should be able to compare with large unordered json', () => {
    const jsonSource = [
      {
        '_id': '5e4e7b164db28483cfe4f786',
        'isActive': false,
        'balance': '$1,761.52',
        'picture': 'http://placehold.it/32x32',
        'age': 24,
        'eyeColor': 'green',
        'longitude': -145.447211,
        'tags': [
          'sint',
          'culpa',
          'qui'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Madelyn Jenkins'
          },
          {
            'id': 1,
            'name': 'Irene Cantu'
          }
        ],
        'greeting': 'Hello, Evangeline Hudson! You have 2 unread messages.'
      },
      {
        '_id': '5e4e7b16fc483429032b47c6',
        'tags': [
          'qui',
          'dolore',
          'dolor',
          'duis',
          'nulla',
          'deserunt',
          'aliqua'
        ],
        'friends': [
          {
            'id': 2,
            'name': 'Delaney Salazar'
          }
        ],
        'greeting': 'Hello, Shields Day! You have 7 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '5e4e7b165b00392b3a58f987',
        'index': 0,
        'guid': '1e4652ab-9349-4e17-bf97-ddf1d414047f',
        'isActive': true,
        'latitude': -67.37599,
        'longitude': -134.899322,
        'tags': [
          'mollit',
          'ipsum',
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Mayer Pacheco'
          },
          {
            'id': 1,
            'name': 'Kari Mercer'
          },
          {
            'id': 2,
            'name': 'Diana Pace'
          }
        ],
        'greeting': 'Hello, Phoebe Love! You have 10 unread messages.',
        'favoriteFruit': 'banana'
      },
      {
        'friends': [
          {
            'id': 0,
            'name': 'Barbara Campbell'
          },
          {
            'id': 2,
            'name': 'Adrienne Rowe'
          }
        ],
        'latitude': -24.924509,
        'longitude': -16.273549,
        'tags': [
          'elit',
          'do',
          'aute',
          'id',
          'id',
          'sint',
          'ad'
        ]
      },
      {
        '_id': '5e4e7b16ef2735ac1a25746c',
        'index': 4,
        'guid': '3202053d-25a7-47cf-8a2f-40e5e680634f',
        'isActive': true,
        'balance': '$3,498.35',
        'picture': 'http://placehold.it/32x32',
        'age': 32,
        'tags': [],
        'friends': [
          {
            'id': 0,
            'name': 'Russell Roy'
          },
          {
            'id': 1,
            'name': 'Herman Conway'
          },
          {
            'id': 2,
            'name': 'Leanna Webster'
          }
        ],
        'greeting': 'Hello, Sanford Martin! You have 5 unread messages.',
        'favoriteFruit': 'banana',
        'eyeColor': 'blue',
        'name': 'Sanford Martin',
        'registered': '2018-02-11T05:50:04 -07:00',
        'latitude': 59.125674
      }
    ]

    const jsonDest = [
      {
        '_id': '5e4e7b165b00392b3a58f987',
        'index': 0,
        'guid': '1e4652ab-9349-4e17-bf97-ddf1d414047f',
        'isActive': true,
        'latitude': -67.37599,
        'longitude': -134.899322,
        'tags': [
          'mollit',
          'ipsum',
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Mayer Pacheco'
          },
          {
            'id': 1,
            'name': 'Kari Mercer'
          },
          {
            'id': 2,
            'name': 'Diana Pace'
          }
        ],
        'greeting': 'Hello, Phoebe Love! You have 10 unread messages.',
        'favoriteFruit': 'banana'
      },
      {
        '_id': '5e4e7b164db28483cfe4f786',
        'isActive': false,
        'balance': '$1,761.52',
        'picture': 'http://placehold.it/32x32',
        'age': 24,
        'eyeColor': 'green',
        'longitude': -145.447211,
        'tags': [
          'sint',
          'qui',
          'culpa'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Madelyn Jenkins'
          },
          {
            'id': 1,
            'name': 'Irene Cantu'
          }
        ],
        'greeting': 'Hello, Evangeline Hudson! You have 2 unread messages.'
      },
      {
        '_id': '5e4e7b16fc483429032b47c6',
        'tags': [
          'qui',
          'dolore',
          'dolor',
          'duis',
          'nulla',
          'deserunt',
          'aliqua'
        ],
        'greeting': 'Hello, Shields Day! You have 7 unread messages.',
        'favoriteFruit': 'strawberry',
        'friends': [
          {
            'id': 2,
            'name': 'Delaney Salazar'
          }
        ],
      },
      {
        'latitude': -24.924509,
        'longitude': -16.273549,
        'tags': [
          'elit',
          'do',
          'aute',
          'id',
          'id',
          'sint',
          'ad'
        ],
        'friends': [
          {
            'id': 0,
            'name': 'Barbara Campbell'
          },
          {
            'id': 2,
            'name': 'Adrienne Rowe'
          }
        ]
      },
      {
        '_id': '5e4e7b16ef2735ac1a25746c',
        'index': 4,
        'guid': '3202053d-25a7-47cf-8a2f-40e5e680634f',
        'isActive': true,
        'balance': '$3,498.35',
        'picture': 'http://placehold.it/32x32',
        'age': 32,
        'eyeColor': 'blue',
        'name': 'Sanford Martin',
        'registered': '2018-02-11T05:50:04 -07:00',
        'latitude': 59.125674,
        'tags': [],
        'friends': [
          {
            'id': 0,
            'name': 'Russell Roy'
          },
          {
            'id': 1,
            'name': 'Herman Conway'
          },
          {
            'id': 2,
            'name': 'Leanna Webster'
          }
        ],
        'greeting': 'Hello, Sanford Martin! You have 5 unread messages.',
        'favoriteFruit': 'banana'
      }
    ]

    expect(compare(jsonSource, jsonDest)).to.equal(true)
  })
})