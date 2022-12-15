import request from 'supertest'

import * as db from '../../db/functions/peets.js'
import server from '../../server.js'

vi.spyOn(console, 'error').mockImplementation(() => {
  return
})
vi.mock('../../db/functions/peets.js')

beforeEach(() => {
  vi.resetAllMocks()
})

describe('GET/api/v1/peets', () => {
  test('returns an array of peets', () => {
    const mockData = [
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
    ]
    db.getPeets.mockReturnValue(Promise.resolve(mockData))
    return request(server)
      .get('/api/v1/peets')
      .then((res) => {
        expect(res.body).toHaveLength(2)
        expect(res.status).toBe(200)
      })
  })
  test('returns an error', () => {
    db.getPeets.mockImplementation(() => Promise.reject('No Peets for you!'))

    return request(server)
      .get('/api/v1/peets')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('No Peets for you!')
      })
  })
})
