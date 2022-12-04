import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { getRandomDrink } from '../apiClient/drinks.js'
import Spinner from '../components/Spinner'
import styles from './Drinks.module.scss'

const Drinks = () => {
  const [drink, setDrink] = useState({})
  const [loading, setLoading] = useState(true)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    getRandomDrink()
      .then((currentDrink) => {
        setDrink(currentDrink)
      })
      .catch((err) => {
        err.message
      })
  }, [])

  const ingredients = useMemo(() => {
    const allIngredients = Object.fromEntries(
      Object.entries(drink).filter(([key]) => key.includes('strIngredient'))
    )
    const ingredientsArray = Object.values(allIngredients).filter(
      (ingredient) => ingredient !== null
    )
    return ingredientsArray
  }, [drink])

  const measures = useMemo(() => {
    const allMeasures = Object.fromEntries(
      Object.entries(drink).filter(([key]) => key.includes('strMeasure'))
    )
    const measuresArray = Object.values(allMeasures).filter(
      (measure) => measure !== null
    )
    return measuresArray
  }, [drink])

  const handleLoad = () => {
    setLoading(false)
    setShowText(true)
  }

  return (
    <>
      <div>
        <div className={styles.drinksContainer}>
          <img
            src={drink?.strDrinkThumb}
            width='600'
            alt={drink?.srtDrink}
            onLoad={handleLoad}
          ></img>

          {showText ? (
            <>
              <div className={styles.infoContainer}>
                <h1>{drink?.strDrink}</h1>
                <h2>Ingredients:</h2>
                {ingredients?.map((ingredient, key) => {
                  return (
                    <li key={key}>
                      {measures[key] || 'Add'} {ingredient}
                    </li>
                  )
                })}
                <h2>Glass type: {drink?.strGlass}</h2>
                <h2>Category: {drink?.strCategory}</h2>
                <h2>Instructions:</h2> <p>{drink?.strInstructions}</p>
              </div>
            </>
          ) : (
            <div className={styles.spinner}>
              <Spinner loading={loading} />
            </div>
          )}
        </div>
        <button>
          <Link to='/'>Go Home</Link>
        </button>
      </div>
    </>
  )
}

export default Drinks
