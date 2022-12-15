import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { getEventByInviteCode } from '../apiClient/event'
import { createGuestApi } from '../apiClient/guest'
import styles from './InvitePage.module.scss'

export default function InvitePage() {
  const initialState = { name: '', guest_code: '', invite_id: '' }
  const [event, setNewEvent] = useState(initialState)
  const [guestName, setGuestName] = useState('')
  const { invite_id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getEventByInviteCode(invite_id)
      .then((event) => {
        setNewEvent(event)
      })
      .catch((err) => {
        err.message
      })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newGuest = {
      name: guestName,
      event_id: invite_id,
    }

    try {
      const guest = await createGuestApi(newGuest)
      navigate(`/wishlist/${guest.guest_code}`)
    } catch (err) {
      err.message
    }
  }

  function formatDate(date) {
    const eventDate = new Date(date)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return eventDate.toLocaleDateString('en-NZ', options)
  }

  return (
    <>
      <div className={styles.inviteContainer}>
        <h1 className={styles.header}>Secret Santa</h1>
        <h2>You have been invited to: </h2>
        <h3>{event?.event_name}</h3>
        <p>
          {' '}
          Your budget is ${event?.budget}. Save the date! Have your gift ready
          by {formatDate(event?.date)}.
        </p>
        <form className={styles.inviteForm} onSubmit={handleSubmit}>
          <label htmlFor='name'> </label>
          <input
            placeholder='Name'
            type='text'
            value={guestName}
            name='name'
            onChange={(event) => setGuestName(event.target.value)}
            pattern='[A-Za-z ]+'
            required
          />
          <button type='submit'>Create your wishlist →</button>
        </form>
        <img
          src='/server/public/assets/Secret-Santa-.png'
          alt='santa hushing'
          className={styles.santaCopyLinkImg}
        />
      </div>
    </>
  )
}
