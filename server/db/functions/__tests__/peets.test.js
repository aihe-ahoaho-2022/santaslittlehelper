import knex from 'knex'

import config from '../../knexfile.js'
import { addPeets, getPeets } from '../peets.js'

const testDb = knex(config.test)

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())
afterAll(() => testDb.destroy())

describe('getPeets', () => {
  it('gets the peets table from the database', () => {
    return getPeets(testDb).then((peets) => {
      expect(peets).toHaveLength(3)
    })
  })
})

describe('addPeets', () => {
  it('adds the peets and returns new id', () => {
    return addPeets('petname', 'owner', 'image', testDb).then((newPeet) => {
      expect(newPeet[0]).toBe(4)
    })
  })
})
