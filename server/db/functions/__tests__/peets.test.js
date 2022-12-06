import knex from 'knex'

import config from '../../knexfile.js'
import { addPeets, getPeets } from '../peets.js'

const testDb = knex(config.test)

beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())
afterAll(() => testDb.destroy())

describe('getPeets', () => {
  it('gets the guest table from the database', () => {
    return getPeets(testDb).then((peets) => {
      expect(peets).toHaveLength(3)
    })
  })
})
