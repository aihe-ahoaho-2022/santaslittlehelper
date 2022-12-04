import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
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
  // it('should render Spinner first', async () => {
  //   render(<Spinner firstTime={true} />)
  //   expect(
  //     screen.queryByText('I see this is your first time!')
  //   ).not.toBeInTheDocument()
  // })
  it('Displays an image, drink name, ingredients, measures, instructions, category and glass type', async () => {
    expect.assertions(7)
    getRandomDrink.mockReturnValue(Promise.resolve(randomDrinkResponse))
    render(
      <BrowserRouter>
        <Drinks loading={true} />
      </BrowserRouter>
    )
    const drinkName = await screen.findByText(randomDrinkResponse.strDrink, {
      exact: false,
    })
    expect(drinkName).toBeTruthy()

    const image = screen.getByRole('img')
    expect(image.src).toMatch(randomDrinkResponse.strDrinkThumb)

    const drinkIngredients = screen.getByText(
      randomDrinkResponse.strIngredient1,
      {
        exact: false,
      }
    )
    expect(drinkIngredients).toBeTruthy()

    const drinkMeasures = screen.findByText(randomDrinkResponse.strMeasure1, {
      exact: false,
    })
    expect(drinkMeasures).toBeTruthy()

    const drinkCategory = screen.getByText(randomDrinkResponse.strCategory, {
      exact: false,
    })
    expect(drinkCategory).toBeTruthy()

    const drinkGlassName = screen.getByText(randomDrinkResponse.strGlass, {
      exact: false,
    })
    expect(drinkGlassName).toBeTruthy()

    const drinkInstructions = screen.getByText(
      randomDrinkResponse.strInstructions,
      {
        exact: false,
      }
    )
    expect(drinkInstructions).toBeTruthy()
  })

  it('has a link to the home route', async () => {
    expect.assertions(1)
    getRandomDrink.mockReturnValue(Promise.resolve(randomDrinkResponse))
    render(
      <BrowserRouter>
        <Drinks loading={true} />
      </BrowserRouter>
    )
    await screen.findByText(`Owen's Grandmother's Revenge`)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')
  })
})
