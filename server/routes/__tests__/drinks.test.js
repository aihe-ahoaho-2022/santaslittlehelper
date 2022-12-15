import nock from 'nock'
import request from 'supertest'

import server from '../../server.js'

beforeEach(() => {
  vi.resetAllMocks()
})

describe('GET/api/v1/drinks', () => {
  it('gets a random drink from the external API', () => {
    const mockData = {
      drinks: [
        {
          idDrink: '11013',
          strDrink: 'Alaska Cocktail',
          strTags: 'Beach,Chilli',
          strCategory: 'Ordinary Drink',
          strAlcoholic: 'Alcoholic',
          strGlass: 'Cocktail glass',
          strInstructions:
            'Stir all ingredients with ice, strain contents into a cocktail glass. Drop in a twist of lemon and serve.',
        },
      ],
    }
    const scope = nock('https://www.thecocktaildb.com')
      .get('/api/json/v1/1/random.php')
      .reply(200, mockData)
    return request(server)
      .get('/api/v1/drinks')
      .then((data) => {
        expect(data.body).toEqual(mockData)
        expect(scope.isDone()).toBe(true)
      })
  })
})

describe('GET/api/v1/drinks', () => {
  it('sends an error status if it fails to get a random drink from the external API', () => {
    const scope = nock('https://www.thecocktaildb.com')
      .get('/api/json/v1/1/random.php')
      .reply(500)
    return request(server)
      .get('/api/v1/drinks')
      .then((res) => {
        expect(res.status).toEqual(500)
        expect(scope.isDone()).toBe(true)
      })
  })
})
