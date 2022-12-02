import { useEffect, useState } from 'react'

import { getRandomDrink } from '../apiClient/drinks.js'

const Drinks = () => {
  const [drink, setDrink] = useState({})
  const [ingredients, setIngredients] = useState([])
  const [measures, setMeasures] = useState([])

  useEffect(() => {
    getRandomDrink()
      .then((currentDrink) => {
        setDrink(currentDrink)
      })
      .catch((err) => {
        err.message
      })
  }, [])

  useEffect(() => {
    const allIngredients = Object.fromEntries(
      Object.entries(drink).filter(([key]) => key.includes('strIngredient'))
    )
    const ingredientsArray = Object.values(allIngredients).filter(
      (ingredient) => ingredient !== null
    )
    setIngredients(ingredientsArray)
  }, [drink])

  useEffect(() => {
    const allMeasures = Object.fromEntries(
      Object.entries(drink).filter(([key]) => key.includes('strMeasure'))
    )
    const measuresArray = Object.values(allMeasures).filter(
      (measure) => measure !== null
    )
    setMeasures(measuresArray)
  }, [drink])

  return (
    <>
      <div>
        <h1>{drink?.strDrink}</h1>
        <img src={drink?.strDrinkThumb} width='600' alt={drink?.srtDrink}></img>
        <p>Ingredients:</p>
        {ingredients?.map((ingredient, key) => {
          return (
            <li key={key}>
              {measures[key] || 'Add'} {ingredient}
            </li>
          )
        })}
        <p>Glass type: {drink?.strGlass}</p>
        <p>Category: {drink?.strCategory}</p>
        <p>Instructions: {drink?.strInstructions}</p>
      </div>
    </>
  )
}

export default Drinks
