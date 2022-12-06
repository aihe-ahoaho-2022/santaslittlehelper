import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getEvents } from '../apiClient/event.js'
import styles from './Dashboard.module.scss'

const Dashboard = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents()
      setEvents(events)
    }
    fetchEvents()
  }, [])

  const MOCK_AUTHID = 69

  // todo: hostId should be auth0_id but setup after.
  const filterEvents = (events) => {
    return events.filter((event) => event.host_id === MOCK_AUTHID)
  }

  return (
    <div className={styles.dashboard}>
      <h1>Secret Santa</h1>
      <hr></hr>
      <h2>Your events</h2>
      <div className={styles.events}>
        {filterEvents(events).map((event) => (
          <div className={styles.event} key={event.id}>
            <a href={`/dashboard/${event.invite_id}`}>
              <h2 className={styles.title}>{event.event_name}</h2>
            </a>
            <p>
              {' '}
              Event Date: {event.date} | Guest{' '}
              {event.status === 0 ? 'Submissions Open' : 'Submissions Closed'}
            </p>
            <button>
              <Link to={`/dashboard/${event.invite_id}`}>View Event</Link>
            </button>
            <img
              src='../../server/public/tree.PNG'
              alt='christmas tree'
              width='40'
              className={styles.treeImage}
            ></img>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
