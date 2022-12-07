import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  getAssignedWishlist,
  getEventByGuestCodeApi,
  getWishlistByIdApi,
  updatedWishlistApi,
} from '../apiClient/guest'
import styles from './Wishlist.module.scss'

export default function Wishlist() {
  const [newWish, setNewWish] = useState(null)
  const { guest_code } = useParams()
  const [showForm, setShowForm] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [event, setEvent] = useState(null)
  const [eventResult, setEventResult] = useState([])
  const [assignedWishlist, setAssignedWishlist] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const wishlist = await getWishlistByIdApi(guest_code)
      setNewWish(wishlist)
      const event = await getEventByGuestCodeApi(guest_code)
      setEvent(event)
      setEventResult(event[0].status)

      const assigned = await getAssignedWishlist(guest_code)
      setAssignedWishlist(assigned)
    }
    fetchData()
  }, [guest_code])

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

  const handleDate = (date) => {
    const today = new Date()
    const eventDate = new Date(date)
    const diffTime = Math.abs(eventDate - today)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays <= 1) {
      return `You have ${diffDays} day left! you better of bought it already!`
    } else if (diffDays < 14) {
      return `You have ${diffDays} days left`
    } else {
      return `You have ${Math.floor(diffDays / 7)} weeks left`
    }
  }

  if (!newWish || !event) {
    return <></>
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`localhost:5173/wishlist/${guest_code}`)
  }

  function formatDate(date) {
    const eventDate = new Date(date)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return eventDate.toLocaleDateString('en-NZ', options)
  }

  return (
    <div>
      <div className={styles.eventContainer}>
        <h1 className={styles.header}>Secret Santa</h1>

        {eventResult === 1 ? (
          <div className={styles.createEventContainer}>
            <h2 className={styles.secondaryHeading}>Your Buddy</h2>
            <p>
              For the {"'"}
              {event[0].event_name}
              {"'"} event, your buddy is:
            </p>
            <div className={styles.assignedName}>
              {assignedWishlist?.name}
              <img
                src='/server/public/assets/candyCane.png'
                className={styles.candyCaneImg}
                alt='candy cane'
                draggable='false'
              />
            </div>

            <div className={styles.assignedWishlist}>
              <p>Their wish list: {assignedWishlist?.wishlist}.</p>
              <p>
                Make sure you have your gift sorted by{' '}
                {formatDate(event[0].date)}, the budget is ${event[0].budget}{' '}
              </p>
              <img
                src='/server/public/assets/tree.PNG'
                alt='cartoon drawing of christmas tree person'
                className={styles.treeImAssigned}
                draggable='false'
              />
            </div>
          </div>
        ) : (
          <>
            {showForm && (
              <div className={styles.createEventContainer}>
                <h2 className={styles.secondaryHeading}>Your Wishlist</h2>
                <p>Add to your wishlist! The budget is ${event[0].budget}</p>
                <form className={styles.eventForm} onSubmit={handleSubmit}>
                  <textarea
                    type='text'
                    name='wishlist'
                    id='wishlist'
                    value={newWish.wishlist}
                    onChange={handleChange}
                    placeholder='Type your wishlist here'
                    maxLength={100}
                  />
                  <button type='submit'>Submit</button>
                </form>
                <img
                  src='/server/public/assets/xmas-cat.PNG'
                  alt='cat'
                  className={styles.catImg}
                  draggable='false'
                />
              </div>
            )}
            <div>
              {submitted && (
                <>
                  <div className={styles.createEventContainer}>
                    <h2 className={styles.secondaryHeading}>Your Wishlist</h2>

                    <h3 className={styles.wishlistItem}>
                      {/* handleText */ newWish.wishlist}
                    </h3>

                    <button className={styles.editBtn} onClick={handleEdit}>
                      Edit Wishlist
                    </button>

                    <p className={styles.days}> {handleDate(event[0].date)}</p>

                    <img
                      src='/server/public/assets/tree.PNG'
                      alt='tree'
                      className={styles.treeImg}
                      draggable='false'
                    />
                  </div>
                  <div className={styles.eventLinkContainer}>
                    <div className={styles.linkContainer}>
                      <p>Your Event Link:</p>
                      <a href={`http://localhost:5173/wishlist/${guest_code}`}>
                        http://elf.co/wishlist/{guest_code}
                      </a>
                      <div className={styles.copyLinkContainer}>
                        <p>Save this link to come back to your wishlist</p>

                        <img
                          src='/server/public/assets/Secret-Santa-small.png'
                          alt='santa hushing'
                          className={styles.santaCopyLinkImg}
                        />

                        <button onClick={copyLink}>Copy link</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
