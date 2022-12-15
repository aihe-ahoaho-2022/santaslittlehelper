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
        console.log(err.message)
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
    <div className={styles.container}>
      <h1 className={styles.drunkTitle}>drunk santa</h1>
      <div className={styles.drinksContainer}>
        <img
          src={drink.strDrinkThumb}
          alt={drink.srtDrink}
          onLoad={handleLoad}
          height='50%'
          width='50%'
        ></img>

        {showText ? (
          <div className={styles.content}>
            <div className={styles.infoContainer}>
              <h1>{drink.strDrink}</h1>
              <hr></hr>
              <div className={styles.catGlassContainer}>
                <h2 className={styles.catGlasschild1}>
                  Category: <span>{drink.strCategory}</span>
                </h2>
                <h2 className={styles.catGlasschild2}>
                  Glass type: <span>{drink.strGlass}</span>{' '}
                </h2>
              </div>

              <hr />
              <h2 id='ingredients'>Ingredients:</h2>
              <ul aria-labelledby='ingredients'>
                {ingredients?.map((ingredient, key) => {
                  return (
                    <li key={key}>
                      {measures[key] || 'Add'} {ingredient}
                    </li>
                  )
                })}
              </ul>
              <div className={styles.instructions}>
                <h2>Instructions:</h2> <p>{drink.strInstructions}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.spinner}>
            <Spinner loading={loading} />
          </div>
        )}
      </div>
      <div className={styles.centerButton}>
        <Link
          onClick='window.location.reload()'
          className={styles.drinksButton}
          to='/drinks'
        >
          randomise drink
        </Link>

        <img
          src='../../server/public/assets/tree.PNG'
          alt='christmas tree'
          width='80'
          className={styles.treeImage}
        ></img>
      </div>
    </div>
  )
}

export default Drinks
