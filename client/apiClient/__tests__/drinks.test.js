import nock from 'nock'

import { getRandomDrink } from '../drinks'

describe('apiClient/drinks.js', () => {
  it('gets a random drink from the api', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/drinks')
      .reply(200, {
        drinks: [
          {
            strDrink: 'Espresso Martini',
            strGlass: 'Cocktail glass',
            strIngredient1: 'Vodka',
            strMeasure1: '5 cl',
          },
        ],
      })
    return getRandomDrink().then((chosenDrink) => {
      expect(chosenDrink.strDrink).toContain('Espresso Martini')
      expect(chosenDrink.strGlass).toContain('Cocktail glass')
      expect(chosenDrink.strIngredient1).toContain('Vodka')
      expect(chosenDrink.strMeasure1).toContain('5 cl')
      expect(scope.isDone()).toBe(true)
    })
  })
})
