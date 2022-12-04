import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getWishlistByIdApi, updatedWishlistApi } from '../apiClient/guest'

export default function AddWishlist() {
  const [newWish, setNewWish] = useState(null)
  const { guest_code } = useParams()
  const [showForm, setShowForm] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  // place holder text
  const partner = 'Mickey Mouse in da House'
  const partnerWishlist = 'cheese and more cheese'

  // completed is a placeholder for now. It will be status from Event table.
  const completed = false

  useEffect(() => {
    getWishlistByIdApi(guest_code)
      .then((wishlist) => {
        setNewWish(wishlist)
      })
      .catch((err) => {
        err.message
      })
  }, [])

  const handleEdit = () => {
    setShowForm(!showForm)
    setSubmitted(!submitted)
  }

  function handleChange(event) {
    const { name, value } = event.target
    setNewWish((result) => {
      return { ...result, [name]: value }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    updatedWishlistApi(guest_code, newWish)
      .then(setShowForm(false))
      .then(setSubmitted(true))
  }

  return (
    <div>
      <h1>Hi {newWish?.name}! </h1>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <label htmlFor='wishlist'>Add Wishlist:</label>
          <input
            type='text'
            name='wishlist'
            id='wishlist'
            value={newWish?.wishlist}
            onChange={handleChange}
          />
          <button type='submit'>Add Wishlist</button>
        </form>
      )}
      <div>
        <p>Current Wishlist Item: {newWish?.wishlist}</p>
        {submitted && <button onClick={handleEdit}>Edit Wishlist</button>}
      </div>
      <div>
        {/* This code is just a place holder */}
        <h2>Partner Wishlist</h2>
        <p>
          {partner}: {partnerWishlist}
        </p>
        <p>Completed: {completed ? 'Yes' : 'No'}</p>
      </div>
    </div>
  )
}
