import nock from 'nock'

import {
  assignGifter,
  createEvent,
  deleteGuest,
  getAllParticipants,
  getEvent,
  getEventByInviteCode,
  getEvents,
  updateEventStatus,
  updateGuest,
  updateWishlistGifterApi,
} from '../event'

describe('createEvent', () => {
  it('creates a secret santa event', () => {
    const scope = nock('http://localhost')
      .post('/api/v1/event')
      .reply(200, {
        host_id: 6,
        invite_id: '57D6F99',
        event_name: 'Puppy Christmas Party',
        budget: 65,
        date: 18 - 12 - 2022,
      })

    return createEvent().then((event) => {
      expect(event.event_name).toBe('Puppy Christmas Party')
      expect(event.budget).toBe(65)
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('getEvent', () => {
  it('gets a secret santa event', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/event/dashboard/6')
      .reply(200, {
        event_id: 6,
        host_id: 6,
        invite_id: '57D6F99',
        event_name: 'Puppy Christmas Party',
        budget: 65,
        date: 18 - 12 - 2022,
      })

    return getEvent(6).then((event) => {
      expect(event.event_name).toBe('Puppy Christmas Party')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('getEvents', () => {
  it('gets secret santa events', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/event/dashboard')
      .reply(200, {
        host_id: 6,
        invite_id: '57D6F99',
        event_name: 'Puppy Christmas Party',
        budget: 65,
        date: 18 - 12 - 2022,
      })

    return getEvents().then((event) => {
      expect(event.event_name).toBe('Puppy Christmas Party')
      expect(event.budget).toBe(65)
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('getAllParticipants', () => {
  it('gets all secret santa participants', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/wishlist')
      .reply(200, {
        result: [
          {
            id: 0,
            guest_code: '9ACE6AD157D6F81D9C774D39A287DA10',
            event_id: 1,
            name: 'Bruno',
            wishlist: 'gardening tools and soil',
          },
          {
            id: 1,
            guest_code: '57D6F81289ACE6AD1D9C774D39A7DA10',
            event_id: 1,
            name: 'Bob',
            wishlist: 'BBQ and a new lawnmower',
          },
        ],
      })

    return getAllParticipants().then((event) => {
      expect(event.result).toHaveLength(2)
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('deleteGuest', () => {
  it('delete a secret santa participants', () => {
    const scope = nock('http://localhost')
      .delete('/api/v1/wishlist/2')
      .reply(200, {
        result: [
          {
            id: 0,
            guest_code: '9ACE6AD157D6F81D9C774D39A287DA10',
            event_id: 1,
            name: 'Bruno',
            wishlist: 'gardening tools and soil',
          },
          {
            id: 1,
            guest_code: '57D6F81289ACE6AD1D9C774D39A7DA10',
            event_id: 1,
            name: 'Bob',
            wishlist: 'BBQ and a new lawnmower',
          },
        ],
      })

    return deleteGuest(2).then((event) => {
      expect(event.result).toHaveLength(2)
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('updateGuest', () => {
  it('updates a secret santa guest', () => {
    const scope = nock('http://localhost')
      .patch('/api/v1/wishlist/0')
      .reply(200, {
        id: 0,
        guest_code: '9ACE6AD157D6F81D9C774D39A287DA10',
        event_id: 1,
        name: 'Bruno',
        wishlist: 'gardening tools and soil',
        gifter_id: 1,
      })

    return updateGuest(0, 1).then((guest) => {
      expect(guest.gifter_id).toBe(1)
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('updateWishlistGifterApi', () => {
  it('updates a secret santa guests wishlist', () => {
    const assignment = {
      id: 0,
      guest_code: '9ACE',
      event_id: 1,
      name: 'Bruno',
      wishlist: 'gardening tools and soil',
      gifter_id: 1,
    }
    const scope = nock('http://localhost')
      .put('/api/v1/wishlist/9ACE')
      .reply(200, assignment)

    return updateWishlistGifterApi(assignment).then((guest) => {
      expect(guest.wishlist).toContain('gardening tools and soil')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('getEventByInviteCode', () => {
  it('gets event by invite code', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/invite/57D6F81')
      .reply(200, {
        event_id: 1,
        host_id: 1,
        invite_id: '57D6F81',
        event_name: 'Trade Me Christmas Party',
        budget: 30,
        date: '19-12-2022',
        status: false,
      })

    return getEventByInviteCode('57D6F81').then((event) => {
      expect(event.host_id).toBe(1)
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('updateEventStatus', () => {
  it('updates event status after draw', () => {
    const scope = nock('http://localhost')
      .patch('/api/v1/event/dashboard/57D6F81')
      .reply(200, [
        {
          event_id: 1,
          host_id: 1,
          invite_id: '57D6F81',
          event_name: 'Trade Me Christmas Party',
          budget: 30,
          date: '19-12-2022',
          status: true,
        },
      ])

    return updateEventStatus('57D6F81').then((event) => {
      expect(event.status).toBe(true)
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('assignGifter', () => {
  it('gets event by invite code', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/event/dashboard/1/assign')
      .reply(200, {
        event_id: 1,
        host_id: 1,
        invite_id: '57D6F81',
        event_name: 'Trade Me Christmas Party',
        budget: 30,
        date: '19-12-2022',
        status: false,
      })

    return assignGifter(1).then((event) => {
      expect(event.host_id).toBe(1)
      expect(event.event_name).toBe('Trade Me Christmas Party')
      expect(scope.isDone()).toBe(true)
    })
  })
})
