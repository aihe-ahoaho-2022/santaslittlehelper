import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div>
        <h1>Elf.Co</h1>
        <div>
          <Link to='/event'>Secret Santa</Link>
        </div>
        <div>
          <Link to='/drinks'>Drunk Santa</Link>
        </div>
        <div>
          <Link to='/peets'>Peets</Link>
        </div>
      </div>
    </>
  )
}

export default Home
