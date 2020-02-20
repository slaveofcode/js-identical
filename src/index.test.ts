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

    const jsonSource3 = ['read', { weak: true }, [{ fly: true }], 'write']
    const jsonDest3 = ['write', { weak: true }, [{ fly: true }], 'read']

    const jsonSource4 = ['read', { weak: true }, [{ fly: false }], 'write']
    const jsonDest4 = ['write', { weak: true }, [{ fly: true }], 'read']

    const jsonSource5 = ['read', { weak: true }, [{ fly: false }], [12, 'foo'], 'write']
    const jsonDest5 = ['write', { weak: true }, [{ fly: false }, { fly: true }], 'read', [12, 'foo', 45]]

    expect(compare(jsonSource, jsonDest)).to.equal(true)
    expect(compare(jsonSource2, jsonDest2)).to.equal(false)
    expect(compare(jsonSource3, jsonDest3)).to.equal(true)
    expect(compare(jsonSource4, jsonDest4)).to.equal(false)
    expect(compare(jsonSource5, jsonDest5)).to.equal(true)
  })

  it('should be able to compare with large json', () => {
    const jsonSource = [
      {
        '_id': '5e4e7b165b00392b3a58f987',
        'index': 0,
        'guid': '1e4652ab-9349-4e17-bf97-ddf1d414047f',
        'isActive': true,
        'balance': '$3,371.05',
        'picture': 'http://placehold.it/32x32',
        'age': 38,
        'eyeColor': 'brown',
        'name': 'Phoebe Love',
        'gender': 'female',
        'company': 'EMTRAK',
        'email': 'phoebelove@emtrak.com',
        'phone': '+1 (997) 443-3802',
        'address': '381 Lois Avenue, Frank, Guam, 2246',
        'about': 'Incididunt ipsum veniam amet amet non adipisicing. Nostrud occaecat laboris exercitation aliqua ipsum labore eu ut deserunt do ipsum. Labore dolore est occaecat amet veniam occaecat ipsum id. Et enim voluptate cupidatat dolor mollit. Et elit et fugiat magna consequat quis id ea cupidatat magna nostrud. Culpa anim non esse voluptate cillum cillum proident tempor reprehenderit fugiat ad.\r\n',
        'registered': '2018-12-30T12:30:06 -07:00',
        'latitude': -67.37599,
        'longitude': -134.899322,
        'tags': [
          'mollit',
          'ipsum',
          'veniam',
          'magna',
          'ipsum',
          'proident',
          'commodo'
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
        'index': 1,
        'guid': '4948fcca-9691-4af5-aaaf-5dc4ef2d1e15',
        'isActive': false,
        'balance': '$1,761.52',
        'picture': 'http://placehold.it/32x32',
        'age': 24,
        'eyeColor': 'green',
        'name': 'Evangeline Hudson',
        'gender': 'female',
        'company': 'BITTOR',
        'email': 'evangelinehudson@bittor.com',
        'phone': '+1 (986) 521-2498',
        'address': '768 Horace Court, Freetown, Kansas, 8914',
        'about': 'Cillum commodo nisi eu veniam quis nulla consequat. Do duis officia tempor occaecat proident do reprehenderit sit ea. Magna sint ullamco exercitation elit ad pariatur magna culpa. Occaecat dolor anim consequat ipsum qui aute laboris ullamco sunt. Laboris quis qui fugiat amet proident enim dolore.\r\n',
        'registered': '2019-06-26T06:34:48 -07:00',
        'latitude': -23.635388,
        'longitude': -145.447211,
        'tags': [
          'sint',
          'culpa',
          'veniam',
          'non',
          'Lorem',
          'sunt',
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
          },
          {
            'id': 2,
            'name': 'Dorthy West'
          }
        ],
        'greeting': 'Hello, Evangeline Hudson! You have 2 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '5e4e7b16fc483429032b47c6',
        'index': 2,
        'guid': '7d20cc35-29c9-4c4f-bd71-2ee095e0dbd0',
        'isActive': false,
        'balance': '$3,963.54',
        'picture': 'http://placehold.it/32x32',
        'age': 36,
        'eyeColor': 'brown',
        'name': 'Shields Day',
        'gender': 'male',
        'company': 'FLUMBO',
        'email': 'shieldsday@flumbo.com',
        'phone': '+1 (868) 493-3492',
        'address': '865 Charles Place, Flintville, Georgia, 4405',
        'about': 'Sunt exercitation enim in anim fugiat nostrud reprehenderit mollit id voluptate et voluptate quis cillum. Amet ea commodo ipsum id. Ea incididunt ipsum ullamco commodo velit duis ea sunt est enim veniam ut amet. Nisi sunt in duis labore officia eiusmod voluptate ex excepteur aliqua id.\r\n',
        'registered': '2018-11-24T06:35:50 -07:00',
        'latitude': -75.344544,
        'longitude': -105.319761,
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
            'id': 0,
            'name': 'Dora James'
          },
          {
            'id': 1,
            'name': 'Leila Mclaughlin'
          },
          {
            'id': 2,
            'name': 'Delaney Salazar'
          }
        ],
        'greeting': 'Hello, Shields Day! You have 7 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '5e4e7b16cd4ddd42440f73a2',
        'index': 3,
        'guid': '54ed6b3d-f87c-4d88-93d8-535dadb7fb23',
        'isActive': false,
        'balance': '$2,558.53',
        'picture': 'http://placehold.it/32x32',
        'age': 40,
        'eyeColor': 'green',
        'name': 'Fulton Mcclain',
        'gender': 'male',
        'company': 'EXOTECHNO',
        'email': 'fultonmcclain@exotechno.com',
        'phone': '+1 (896) 544-3699',
        'address': '198 Brigham Street, Fingerville, Wisconsin, 6633',
        'about': 'Velit non dolor exercitation aliqua. Veniam sint eu excepteur id nulla. Nulla pariatur sit duis nulla Lorem ullamco sit. Est ea ex voluptate tempor qui. Ex fugiat eu fugiat cupidatat quis exercitation qui. In sit occaecat cillum ut voluptate quis dolor minim veniam anim velit.\r\n',
        'registered': '2017-06-29T10:09:56 -07:00',
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
            'id': 1,
            'name': 'Lea Mitchell'
          },
          {
            'id': 2,
            'name': 'Adrienne Rowe'
          }
        ],
        'greeting': 'Hello, Fulton Mcclain! You have 10 unread messages.',
        'favoriteFruit': 'banana'
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
        'gender': 'male',
        'company': 'PETICULAR',
        'email': 'sanfordmartin@peticular.com',
        'phone': '+1 (868) 576-3208',
        'address': '448 Stoddard Place, Clarktown, Louisiana, 2354',
        'about': 'Ex quis amet et reprehenderit sunt sit consequat quis. Cupidatat sunt reprehenderit ut anim est ullamco in eiusmod excepteur. Occaecat deserunt enim est amet ullamco id fugiat velit veniam minim esse culpa elit anim.\r\n',
        'registered': '2018-02-11T05:50:04 -07:00',
        'latitude': 59.125674,
        'longitude': 15.823035,
        'tags': [
          'qui',
          'laborum',
          'nulla',
          'elit',
          'minim',
          'ullamco',
          'laborum'
        ],
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
        'balance': '$3,371.05',
        'picture': 'http://placehold.it/32x32',
        'age': 38,
        'eyeColor': 'brown',
        'name': 'Phoebe Love',
        'gender': 'female',
        'company': 'EMTRAK',
        'email': 'phoebelove@emtrak.com',
        'phone': '+1 (997) 443-3802',
        'address': '381 Lois Avenue, Frank, Guam, 2246',
        'about': 'Incididunt ipsum veniam amet amet non adipisicing. Nostrud occaecat laboris exercitation aliqua ipsum labore eu ut deserunt do ipsum. Labore dolore est occaecat amet veniam occaecat ipsum id. Et enim voluptate cupidatat dolor mollit. Et elit et fugiat magna consequat quis id ea cupidatat magna nostrud. Culpa anim non esse voluptate cillum cillum proident tempor reprehenderit fugiat ad.\r\n',
        'registered': '2018-12-30T12:30:06 -07:00',
        'latitude': -67.37599,
        'longitude': -134.899322,
        'tags': [
          'mollit',
          'ipsum',
          'veniam',
          'magna',
          'ipsum',
          'proident',
          'commodo'
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
        'index': 1,
        'guid': '4948fcca-9691-4af5-aaaf-5dc4ef2d1e15',
        'isActive': false,
        'balance': '$1,761.52',
        'picture': 'http://placehold.it/32x32',
        'age': 24,
        'eyeColor': 'green',
        'name': 'Evangeline Hudson',
        'gender': 'female',
        'company': 'BITTOR',
        'email': 'evangelinehudson@bittor.com',
        'phone': '+1 (986) 521-2498',
        'address': '768 Horace Court, Freetown, Kansas, 8914',
        'about': 'Cillum commodo nisi eu veniam quis nulla consequat. Do duis officia tempor occaecat proident do reprehenderit sit ea. Magna sint ullamco exercitation elit ad pariatur magna culpa. Occaecat dolor anim consequat ipsum qui aute laboris ullamco sunt. Laboris quis qui fugiat amet proident enim dolore.\r\n',
        'registered': '2019-06-26T06:34:48 -07:00',
        'latitude': -23.635388,
        'longitude': -145.447211,
        'tags': [
          'sint',
          'culpa',
          'veniam',
          'non',
          'Lorem',
          'sunt',
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
          },
          {
            'id': 2,
            'name': 'Dorthy West'
          }
        ],
        'greeting': 'Hello, Evangeline Hudson! You have 2 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '5e4e7b16fc483429032b47c6',
        'index': 2,
        'guid': '7d20cc35-29c9-4c4f-bd71-2ee095e0dbd0',
        'isActive': false,
        'balance': '$3,963.54',
        'picture': 'http://placehold.it/32x32',
        'age': 36,
        'eyeColor': 'brown',
        'name': 'Shields Day',
        'gender': 'male',
        'company': 'FLUMBO',
        'email': 'shieldsday@flumbo.com',
        'phone': '+1 (868) 493-3492',
        'address': '865 Charles Place, Flintville, Georgia, 4405',
        'about': 'Sunt exercitation enim in anim fugiat nostrud reprehenderit mollit id voluptate et voluptate quis cillum. Amet ea commodo ipsum id. Ea incididunt ipsum ullamco commodo velit duis ea sunt est enim veniam ut amet. Nisi sunt in duis labore officia eiusmod voluptate ex excepteur aliqua id.\r\n',
        'registered': '2018-11-24T06:35:50 -07:00',
        'latitude': -75.344544,
        'longitude': -105.319761,
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
            'id': 0,
            'name': 'Dora James'
          },
          {
            'id': 1,
            'name': 'Leila Mclaughlin'
          },
          {
            'id': 2,
            'name': 'Delaney Salazar'
          }
        ],
        'greeting': 'Hello, Shields Day! You have 7 unread messages.',
        'favoriteFruit': 'strawberry'
      },
      {
        '_id': '5e4e7b16cd4ddd42440f73a2',
        'index': 3,
        'guid': '54ed6b3d-f87c-4d88-93d8-535dadb7fb23',
        'isActive': false,
        'balance': '$2,558.53',
        'picture': 'http://placehold.it/32x32',
        'age': 40,
        'eyeColor': 'green',
        'name': 'Fulton Mcclain',
        'gender': 'male',
        'company': 'EXOTECHNO',
        'email': 'fultonmcclain@exotechno.com',
        'phone': '+1 (896) 544-3699',
        'address': '198 Brigham Street, Fingerville, Wisconsin, 6633',
        'about': 'Velit non dolor exercitation aliqua. Veniam sint eu excepteur id nulla. Nulla pariatur sit duis nulla Lorem ullamco sit. Est ea ex voluptate tempor qui. Ex fugiat eu fugiat cupidatat quis exercitation qui. In sit occaecat cillum ut voluptate quis dolor minim veniam anim velit.\r\n',
        'registered': '2017-06-29T10:09:56 -07:00',
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
            'id': 1,
            'name': 'Lea Mitchell'
          },
          {
            'id': 2,
            'name': 'Adrienne Rowe'
          }
        ],
        'greeting': 'Hello, Fulton Mcclain! You have 10 unread messages.',
        'favoriteFruit': 'banana'
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
        'gender': 'male',
        'company': 'PETICULAR',
        'email': 'sanfordmartin@peticular.com',
        'phone': '+1 (868) 576-3208',
        'address': '448 Stoddard Place, Clarktown, Louisiana, 2354',
        'about': 'Ex quis amet et reprehenderit sunt sit consequat quis. Cupidatat sunt reprehenderit ut anim est ullamco in eiusmod excepteur. Occaecat deserunt enim est amet ullamco id fugiat velit veniam minim esse culpa elit anim.\r\n',
        'registered': '2018-02-11T05:50:04 -07:00',
        'latitude': 59.125674,
        'longitude': 15.823035,
        'tags': [
          'qui',
          'laborum',
          'nulla',
          'elit',
          'minim',
          'ullamco',
          'laborum'
        ],
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