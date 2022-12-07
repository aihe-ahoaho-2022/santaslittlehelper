import '@testing-library/jest-dom'

import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

import { getRandomDrink } from '../../apiClient/drinks.js'
// import Spinner from '../../components/Spinner.jsx'
import Drinks from '../Drinks'

vi.mock('../../apiClient/drinks.js')

const randomDrinkResponse = {
  strDrink: "Owen's Grandmother's Revenge",
  strCategory: 'Ordinary Drink',
  strGlass: 'Highball glass',
  strInstructions: 'Add ingredients and mix in blender.',
  strDrinkThumb:
    'https://www.thecocktaildb.com/images/media/drink/0wt4uo1503565321.jpg',
  strIngredient1: 'Whiskey',
  strIngredient2: 'Beer',
  strIngredient3: 'Lemonade',
  strIngredient4: 'Ice',
  strMeasure1: '12 oz ',
  strMeasure2: '12 oz ',
  strMeasure3: '12 oz frozen ',
  strMeasure4: '1 cup crushed ',
}

afterEach(() => {
  vi.resetAllMocks()
})

describe('<Drinks />', () => {
  it('Displays an image, drink name, ingredients, measures, instructions, category and glass type', async () => {
    getRandomDrink.mockReturnValue(Promise.resolve(randomDrinkResponse))
    render(<Drinks />, { wrapper: MemoryRouter })
    waitFor(() => getRandomDrink.mock.calls.length > 0).then(async () => {
      const list = await screen.findByRole('list', { name: /ingredients/i })
      within(list).getByText(/12 oz whiskey/i)
      within(list).getByText(/12 oz beer/i)
      within(list).getByText(/12 oz frozen lemonade/i)
      within(list).getByText(/1 cup crushed ice/i)

      screen.getByRole('heading', { name: /highball glass/i })
      screen.getByRole('heading', { name: /ordinary drink/i })
      screen.getByRole('heading', { name: /instructions/i })
    })
  })
  it('has a link to the home route', () => {
    getRandomDrink.mockReturnValue(Promise.resolve(randomDrinkResponse))
    render(<Drinks />, { wrapper: MemoryRouter })
    waitFor(() => getRandomDrink.mock.calls.length > 0).then(async () => {
      // fireEvent.load(await screen.getAllByRole('img'))
      const link = await screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/drinks')
    })
  })
})
