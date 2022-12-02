import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getEvents } from '../apiClient/event.js'

const Dashboard = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents()
      setEvents(events)
    }
    fetchEvents()
  }, [])

  // todo: hostId should be auth0_id but setup after.
  const filterEvents = (events) => {
    return events.filter((event) => event.host_id === 69)
  }

  return (
    <div className='dashboard'>
      <h2>Dashboard</h2>
      <div className='events'>
        {filterEvents(events).map((event) => (
          <div className='event' key={event.id}>
            <h3>Event name: {event.event_name}</h3>
            <p> Event date: {event.date}</p>

            <p>
              {event.status === 0 ? 'Submissions Open' : 'Submissions Closed'}
            </p>
            {/* <Link to={`/dashboard/${event.event_id}`}>View Event</Link> */}
            <Link to={`/dashboard/${event.invite_code}`}>View Event</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
