import { useState } from 'react'
import { Link } from 'react-router-dom'

import { createEvent } from '../apiClient/event.js'
import styles from './CreateEvent.module.scss'

const Event = () => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [budget, setBudget] = useState('')
  const [eventCreated, setEventCreated] = useState(false)
  const [link, setLink] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const host_id = 69

    const event = { name, date, budget, host_id }

    const newEvent = await createEvent(event)

    setLink(newEvent.invite_id)
    setEventCreated(true)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`localhost:5173/invite/${link}`)
  }

  const formatDate = (date) => {
    const newDate = new Date(date)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }

    return newDate.toLocaleDateString('en-NZ', options)
  }

  return (
    <div className={styles.eventContainer}>
      <h1 className={styles.header}>Secret Santa</h1>
      {!eventCreated ? (
        <div className={styles.createEventContainer}>
          <h2 className={styles.secondaryHeading}>Create your event</h2>
          <form className={styles.eventForm} onSubmit={handleSubmit}>
            <label htmlFor='name'>Event Name:</label>
            <input
              id='name'
              type='text'
              required
              value={name}
              name='name'
              onChange={(e) => setName(e.target.value)}
              placeholder='Event Name'
            />
            <label htmlFor='budget'>Budget:</label>
            <input
              id='budget'
              type='numeric'
              name='budget'
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder='$'
            />
            <label htmlFor='date'>Draw Date:</label>
            <input
              id='date'
              type='date'
              name='date'
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder='Draw Date'
            />
            <button>Create your event</button>
          </form>
          <img
            src='/server/public/assets/santa-small.PNG'
            alt='cartoon of santa'
            className={styles.santaImg}
          />
        </div>
      ) : (
        <div className={styles.createEventContainer}>
          <h2 className={styles.secondaryHeading}>Your event:</h2>
          <h3>{name}</h3>
          <div className={styles.linkContainer}>
            <p>Your Event Link:</p>
            <a href={`http://localhost:5173/invite/${link}`}>
              http://elf.co/invite/{link}
            </a>
          </div>
          <div className={styles.copyLinkContainer}>
            <p>Copy and Paste this link to send it to your friends</p>
            <img
              src='/server/public/assets/Secret-Santa-.png'
              alt='santa hushing'
              className={styles.santaCopyLinkImg}
            />
            <button onClick={copyLink}>Copy Link</button>
          </div>
          <img
            src='/server/public/assets/rudolph-v2.png'
            alt='santa hushing'
            className={styles.rudolphImg}
          />
          <h4>Event date: {formatDate(date)}</h4>
          <Link to='/dashboard' className={styles.eventLink}>
            View your Participants
          </Link>
        </div>
      )}
    </div>
  )
}

export default Event
