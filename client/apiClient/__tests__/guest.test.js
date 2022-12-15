import nock from 'nock'

import {
  createGuestApi,
  createWishlistApi,
  deleteWishlistApi,
  getAssignedWishlist,
  getEventByGuestCodeApi,
  getWishlistApi,
  getWishlistByIdApi,
  updatedWishlistApi,
} from '../guest'

describe('getWishlistApi', () => {
  it('returns the guest db', () => {
    const scope = nock('http://localhost').get('/api/v1/wishlist').reply(200, {
      id: 2,
      guest_code: '1D9C774D326AD157D6F889ACE9A7DA10',
      event_id: 2,
      name: 'Brenda',
      wishlist: 'a new car',
      gifter_id: null,
    })
    return getWishlistApi().then((guestList) => {
      expect(guestList.name).toBe('Brenda')
      expect(guestList.guest_code).toBe('1D9C774D326AD157D6F889ACE9A7DA10')
      expect(guestList.event_id).toBe(2)
      expect(guestList.wishlist).toBe('a new car')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('getEventByGuestCodeApi', () => {
  it('returns the event based on guest code', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/wishlist/DOGGOLIFE/event')
      .reply(200, {
        id: 3,
        guest_code: 'DOGGOLIFE',
        event_id: 45,
        name: 'DOG',
        wishlist: 'Doggo Toys',
        gifter_id: null,
      })
    return getEventByGuestCodeApi('DOGGOLIFE').then((guest) => {
      expect(guest.name).toBe('DOG')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('getWishlistByIdApi', () => {
  it('returns the wishlist based on id', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/wishlist/1')
      .reply(200, {
        id: 1,
        guest_code: 'HAPPYDOGGO',
        event_id: 20,
        name: 'Mr Happy',
        wishlist: 'monkey toy',
        gifter_id: null,
      })
    return getWishlistByIdApi(1).then((guest) => {
      expect(guest.id).toBe(1)
      expect(guest.guest_code).toBe('HAPPYDOGGO')
      expect(guest.name).toBe('Mr Happy')
      expect(guest.wishlist).toBe('monkey toy')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('createWishlistApi', () => {
  it('creates a wishlist', () => {
    const scope = nock('http://localhost').post('/api/v1/wishlist').reply(200, {
      id: 5,
      guest_code: 'E9A7DA6AD15D9C774D3289AC7D6F81D',
      event_id: 3,
      name: 'Murry',
      wishlist: 'a new cat',
      gifter_id: null,
    })
    return createWishlistApi('E9A7DA6AD15D9C774D3289AC7D6F81D').then(
      (guest) => {
        expect(guest.id).toBe(5)
        expect(guest.guest_code).toBe('E9A7DA6AD15D9C774D3289AC7D6F81D')
        expect(guest.event_id).toBe(3)
        expect(guest.name).toBe('Murry')
        expect(guest.wishlist).toBe('a new cat')
        expect(scope.isDone()).toBe(true)
      }
    )
  })
})

describe('updateWishlistApi', () => {
  it('updates a wishlist', () => {
    const scope = nock('http://localhost')
      .patch('/api/v1/wishlist/4')
      .reply(200, {
        id: 4,
        guest_code: 'A6AD1D3289ACE9A7D57D6F81D9C7741',
        event_id: 3,
        name: 'Boris',
        wishlist: 'Muffins',
        gifter_id: null,
      })
    return updatedWishlistApi(4, 'Muffins').then((guest) => {
      expect(guest.wishlist).toBe('Muffins')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('deleteWishlistApi', () => {
  it('deletes a wishlist', () => {
    const scope = nock('http://localhost')
      .delete('/api/v1/wishlist/5')
      .reply(200, {
        id: 5,
        guest_code: 'E9A7DA6AD15D9C774D3289AC7D6F81D',
        event_id: 3,
        name: 'Murry',
        wishlist: 'a new cat',
        gifter_id: null,
      })
    return deleteWishlistApi(5).then((guest) => {
      expect(guest.guest_code).toBe('E9A7DA6AD15D9C774D3289AC7D6F81D')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('createGuestApi', () => {
  it('creates a guest', () => {
    const scope = nock('http://localhost')
      .post(`/api/v1/wishlist`)
      .reply(200, [
        {
          event_id: '46a23726-827c-4c63-b04c-6ec38d29fd4f',
          name: 'barry',
        },
      ])
    return createGuestApi({
      event_id: '46a23726-827c-4c63-b04c-6ec38d29fd4f',
      name: 'barry',
    }).then((guest) => {
      expect(guest.event_id).toBe('46a23726-827c-4c63-b04c-6ec38d29fd4f')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('getAssignedWishlist', () => {
  it('returns a list of guests assigned to a wishlist', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/wishlist/A6AD1D3289ACE9A7D57D6F81D9C7741/assigned')
      .reply(200, {
        id: 4,
        guest_code: 'A6AD1D3289ACE9A7D57D6F81D9C7741',
        event_id: 3,
        name: 'Boris',
        wishlist: 'a new job',
        gifter_id: null,
      })

    return getAssignedWishlist('A6AD1D3289ACE9A7D57D6F81D9C7741').then(
      (buddy) => {
        expect(buddy.name).toBe('Boris')
        expect(scope.isDone()).toBe(true)
      }
    )
  })
})
