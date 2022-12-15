import nock from 'nock'

import { getPeets } from '../peets'

describe('getPeet', () => {
  it('gets all the peets from api call', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/peets')
      .reply(200, [
        {
          id: 1,
          petname: 'Croissant',
          owner: 'Rohan',
          image: 'PEET-18.jpg',
        },
        {
          id: 2,
          petname: 'Frank',
          owner: 'Ben',
          image: 'PEET-12.jpg',
        },
        {
          id: 3,
          petname: 'George',
          owner: 'James',
          image: 'PEET-29.jpg',
        },
      ])
    return getPeets().then((peets) => {
      expect(peets.length).toBe(3)
      expect(scope.isDone()).toBe(true)
    })
  })
})
