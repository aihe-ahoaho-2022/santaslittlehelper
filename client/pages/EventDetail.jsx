import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  assignGifter,
  deleteGuest,
  getAllParticipants,
  getEvent,
  updateEventStatus,
} from '../apiClient/event.js'
import styles from './EventDetail.module.scss'

const EventDetail = () => {
  const { event_id } = useParams()
  const [guestList, setGuestList] = useState([])
  const [assigned, setAssigned] = useState([])

  const filterParticipants = (participants) => {
    return participants.filter(
      (participant) => participant.event_id == event_id
    )
  }

  const findGifter = (gifter_id) => {
    const gifter = guestList.find((participant) => participant.id === gifter_id)

    const name = trim(gifter?.name)
    return name
  }

  const handleDelete = async (guest_id) => {
    const participants = await deleteGuest(guest_id)
    const newList = filterParticipants(participants)
    setGuestList(newList)
  }

  useEffect(() => {
    const fetchData = async () => {
      const participants = await getAllParticipants()
      const newList = filterParticipants(participants)
      const event = await getEvent(event_id)
      setGuestList(newList)
      setAssigned(event.status)
    }
    fetchData()
  }, [assigned])

  async function handleDraw(event) {
    event.preventDefault()

    const assignments = await assignGifter(event_id)

    setGuestList(assignments)

    const updatedStatus = await updateEventStatus(event_id)

    setAssigned(updatedStatus.status)
  }

  if (guestList === undefined) {
    return <h1>Loading...</h1>
  }

  const trim = (name) => {
    if (name === undefined) return

    if (name.includes(' ')) {
      return (
        <span className={styles.nameWrapper}>
          {name.split(' ')[0]}
          <span className={styles.nameTooltip}>{name}</span>
        </span>
      )
    }
    return name
  }

  return (
    <div className={styles.guestContainer}>
      <h1 className={styles.header}>Secret Santa</h1>
      <h2 className={styles.secondaryHeading}>Participants</h2>
      {assigned ? (
        <div
          className={
            guestList.length > 7 ? styles.sortedGuestsGrid : styles.sortedGuests
          }
        >
          {guestList?.map((participant, i) => {
            return (
              <div key={i} className={styles.assignedGuestWrapper}>
                <p>{trim(participant.name)}</p>

                <p className={styles.arrowThing}>→</p>
                <p>{findGifter(participant.gifter_id)}</p>

                <div>
                  <button onClick={() => handleDelete(participant.id)}>
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <>
          <div
            className={
              guestList.length > 7
                ? styles.unsortedGuestsGrid
                : styles.unsortedGuests
            }
          >
            {guestList?.map((participant, i) => {
              return (
                <div key={i}>
                  <div className={styles.guestWrapper}>
                    <p>{trim(participant.name)}</p>

                    <button onClick={() => handleDelete(participant.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <button className={styles.drawBtn} onClick={handleDraw}>
            Draw
          </button>
        </>
      )}
      <img
        src='/server/public/assets/tree.PNG'
        alt='a cartoon of a person dressed as a christmas tree'
        draggable='false'
        className={styles.treeImg}
      />
    </div>
  )
}

export default EventDetail
