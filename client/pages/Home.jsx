import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Home.module.scss'

const Home = () => {
  return (
    <>
      <div className={styles.home}>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <a href='/event'>
              <img
                src='../../server/public/secretSanta.png'
                alt='secret santa'
                className={styles.image}
              />
            </a>
            <button className={styles.homepageButtons}>
              <Link to='/event' className={styles.links}>
                Secret Santa
              </Link>
            </button>
          </div>
          <div className={styles.imageWrapper}>
            <a href='/peets'>
              <img
                src='../../server/public/onlyPeets.png'
                alt='Santa with Animals'
                className={styles.image}
              />
            </a>
            <button className={styles.homepageButtons}>
              <Link to='/peets' className={styles.links}>
                OnlyPeets
              </Link>
            </button>
          </div>
          <div className={styles.imageWrapper}>
            <a href='/drinks'>
              <img
                src='../../server/public/drunkSanta.png'
                alt='Drunk Santa'
                className={styles.image}
              />
            </a>
            <button className={styles.homepageButtons}>
              <Link to='/drinks' className={styles.links}>
                Drunk Santa
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
