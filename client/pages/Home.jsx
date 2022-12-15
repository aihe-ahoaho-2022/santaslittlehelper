import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Home.module.scss'

const Home = () => {
  return (
    <>
      <div className={styles.home}>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <a href='/secretsanta'>
              <img
                src='../../server/public/assets/Secret-Santa-.png'
                alt='secret santa'
                className={styles.image}
              />
            </a>

            <Link to='/secretsanta' className={styles.links}>
              secret santa
            </Link>
          </div>
          <div className={styles.imageWrapper}>
            <a href='/peets'>
              <img
                src='../../server/public/assets/Only-Peets-.png'
                alt='Santa with Animals'
                className={styles.image}
              />
            </a>
            <Link to='/peets' className={styles.links}>
              onlypeets
            </Link>
          </div>
          <div className={styles.imageWrapper}>
            <a href='/drinks'>
              <img
                src='../../server/public/assets/Drunk-Santa-.png'
                alt='Drunk Santa'
                className={styles.image}
              />
            </a>
            <Link to='/drinks' className={styles.links}>
              drunk santa
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
