import knex from 'knex'

import config from '../../knexfile.js'
import {
  createWishlist,
  deleteWishlist,
  getWishlist,
  getWishlistById,
  updatedWishlist,
  updateWishlistGifter,
} from '../guest.js'

const testDb = knex(config.test)

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())
afterAll(() => testDb.destroy())

describe('getWishlist', () => {
  it('gets the guest table from the database', () => {
    return getWishlist(testDb).then((guest) => {
      expect(guest).toHaveLength(4)
    })
  })

  it('shows the guest name', () => {
    return getWishlist(testDb).then((guest) => {
      expect(guest[0].name).toBe('Bruno')
    })
  })

  it('shows the guests wishlist', () => {
    return getWishlist(testDb).then((guest) => {
      expect(guest[1].wishlist).toContain('BBQ and a new lawnmower')
    })
  })

  it('shows the guests guest-code', () => {
    return getWishlist(testDb).then((guest) => {
      expect(guest[2].guest_code).toBe('1D9C774D326AD157D6F889ACE9A7DA10')
    })
  })
})

describe('getWishlistByID', () => {
  it('gets a guests from the db by the guest-code', () => {
    return getWishlistById('57D6F81289ACE6AD1D9C774D39A7DA10', testDb).then(
      (guest) => {
        expect(guest.name).toBe('Bob')
      }
    )
  })
})

describe('createWishlist', () => {
  test('adds a wish to the db', () => {
    const wish = [
      {
        id: 4,
        guest_code: '1D9C774D326AD157D6F889ACE9A7DA20',
        event_id: '3',
        name: 'mr. meow',
        wishlist: 'salmon',
      },
    ]
    return createWishlist(wish, testDb).then((newWish) => {
      expect(newWish[0].wishlist).toBe('salmon')
    })
  })
})

// describe('updateWishlist', () => {
//   test('updates a guests wishlist based on guest-code', () => {
//     const participant = [
//       {
//         id: 3,
//         guest_code: '6F81E9A7DA6AD157DD9C774D3289AC10',
//         event_id: 2,
//         name: 'Bella',
//         wishlist: 'a nice pair of socks',
//       },
//     ]
//     return updatedWishlist(participant, testDb).then((guest) => {
//       expect(guest[0].wishlist).toContain('a nice pair of socks')
//     })
//   })
// })

// describe('deleteWishlist', () => {
//   it('deletes a guests wishlist based on the id', () => {
//     const deletedPerson = [
//       {
//         id: 3,
//         guest_code: '6F81E9A7DA6AD157DD9C774D3289AC10',
//         event_id: 2,
//         name: 'Bella',
//         wishlist: 'a new house',
//       },
//     ]
//     return deleteWishlist(deletedPerson, testDb).then((deleted) => {
//       expect(deleted).not.toBe('')
//     })
//   })
// })
