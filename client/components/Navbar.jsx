import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.scss'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to='/'>
        <div className={styles.title}>elf.co</div>
      </Link>
      <div className={styles.links}>
        <Link className={styles.signup} to='/'>
          home
        </Link>
        <Link className={styles.login} to='/dashboard'>
          dashboard
        </Link>
      </div>
    </nav>
  )
}
