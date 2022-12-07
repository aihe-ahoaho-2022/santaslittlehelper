import React from 'react'
import { Link } from 'react-router-dom'

import styles from './SSHome.module.scss'

const SSHome = () => {
  return (
    <div className={styles.SSHomeContainer}>
      <div className={styles.SSHomeWrapper}>
        <h1>SECRET SANTA</h1>
        <a href='/event'>
          <img
            src='../../server/public/assets/Secret-Santa-.png'
            alt='secret santa'
            className={styles.image}
          />
        </a>

        <Link to='/event' className={styles.links}>
          LET{"'"}S GET STARTED!
        </Link>
      </div>
    </div>
  )
}

export default SSHome
