import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// import { getEvent } from '../apiClient/event'
import {
  assignGifter,
  deleteGuest,
  getAllParticipants,
  getEvent,
  updateEventStatus,
  updateWishlistGifterApi,
} from '../apiClient/event.js'

const EventDetail = () => {
  const { event_id } = useParams()
  const [guestList, setGuestList] = useState([])
  const [assigned, setAssigned] = useState(null)

  async function handleDelete(guest_id) {
    const participants = await deleteGuest(guest_id)
    const newList = participants.filter(
      (participant) => participant.event_id == event_id
    )
    setGuestList(newList)
  }

  useEffect(() => {
    const fetchParticipants = async () => {
      const participants = await getAllParticipants()

      const newList = participants.filter(
        (participant) => participant.event_id == event_id
      )

      setGuestList(newList)
    }
    fetchParticipants()
  }, [assigned])

  // function handleDraw(event) {
  //   event.preventDefault()
  //   const assignments = assign(guestList)

  //   assignments.forEach((assignment) => {
  //     updateWishlistGifterApi(assignment)
  //   })

  //   return updateEventStatus(event_id).then((event) => {
  //     console.log('new:', event)
  //     setAssigned(true)
  //   })
  // }

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    getEventStatus()
  }, [assigned])

  async function handleDraw(event) {
    event.preventDefault()

    const assignments = await assignGifter(event_id)

    setGuestList(assignments)

    const updatedStatus = await updateEventStatus(event_id)

    setAssigned(updatedStatus.status)
  }

  const findGifter = (gifter_id) => {
    const gifter = guestList.find((participant) => participant.id === gifter_id)

    return gifter?.name
  }

  return (
    <div className='event-details'>
      {assigned ? (
        guestList.map((participant, i) => {
          return (
            <div key={i}>
              <div>
                <p>Name: {participant.name}</p>
                <p>Wishlist: {participant.wishlist}</p>
                <p>Gifter: {findGifter(participant.gifter_id)}</p>

                <div>
                  <button onClick={() => handleDelete(participant.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div>
          {guestList.map((participant, i) => {
            return (
              <div key={i}>
                <div>
                  <p>Name: {participant.name}</p>
                  <p>Wishlist: {participant.wishlist}</p>
                  <div>
                    <button onClick={() => handleDelete(participant.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
          <div>
            <button onClick={handleDraw}>Draw</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventDetail
