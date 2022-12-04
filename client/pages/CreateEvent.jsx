import { useState } from 'react'
import { Link } from 'react-router-dom'

import { createEvent } from '../apiClient/event.js'

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

  return (
    <div className='event'>
      {!eventCreated ? (
        <div className='create-event'>
          <h2>Create a New Event</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Event Name:</label>
            <input
              type='text'
              required
              value={name}
              name='name'
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor='date'>Event Date:</label>
            <input
              type='date'
              name='date'
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <label htmlFor='budget'>Event Budget:</label>
            <input
              type='number'
              name='budget'
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            <button>Create Event</button>
          </form>
        </div>
      ) : (
        <div className='event-created'>
          <h2>Event Created</h2>
          <p>Share this link with your guests</p>
          <a href={`http://localhost:5173/invite/${link}`}>
            http://elf.co/secret-santa/{link}
          </a>
          <button onClick={copyLink}>Copy Link</button>
          <Link to='/dashboard'>Go to Dashboard</Link>
        </div>
      )}
    </div>
  )
}

export default Event
