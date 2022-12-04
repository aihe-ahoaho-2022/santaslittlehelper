import { v4 as uuidv4 } from 'uuid'

import {
  createEvent,
  getEvent,
  getEventById,
  getEvents,
  updateStatus,
} from '../db/functions/events.js'

export default {
  getEvents: async (req, res) => {
    const events = await getEvents()
    res.json(events)
  },
  getEvent: async (req, res) => {
    const { event_id } = req.params

    const event = await getEvent(event_id)
    res.json(event)
  },

  createEvent: async (req, res) => {
    try {
      const eventData = req.body

      eventData.invite_id = uuidv4()

      const newEventObj = await createEvent(eventData)

      const fullEventInfo = await getEventById(newEventObj)

      res.status(201).json(fullEventInfo)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  updateStatus: async (req, res) => {
    const { event_id } = req.params

    const event = await updateStatus(event_id)

    res.json(event)
  },
}
