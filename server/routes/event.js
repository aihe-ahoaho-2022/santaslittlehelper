import express from 'express'

import eventController from '../controllers/event.js'
import { getGuestsByEventId } from '../db/functions/events.js'
import { updateWishlistGifter } from '../db/functions/guest.js'

const router = express.Router()

router.get('/dashboard', eventController.getEvents)
router.post('/', eventController.createEvent)
router.get('/dashboard/:event_id', eventController.getEvent)
router.patch('/dashboard/:event_id', eventController.updateStatus)

router.get('/dashboard/:event_id/assign', async (req, res) => {
  const { event_id } = req.params

  const event = await getGuestsByEventId(event_id)

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }

    return array
  }

  const assign = (array) => {
    const shuffledArray = shuffle(array)
    const assignments = shuffledArray.map((participant, i) => {
      return {
        id: participant.id,
        gifter_id:
          i === shuffledArray.length - 1
            ? shuffledArray[0].id
            : shuffledArray[i + 1].id,
        guest_code: participant.guest_code,
      }
    })

    return assignments
  }

  const assignments = assign(event)

  const updateAssignments = async (assignments) => {
    for (let i = 0; i < assignments.length; i++) {
      await updateWishlistGifter(assignments[i])
    }
  }
})

router.patch('/dashboard/:event_id', (req, res) => {
  const { event_id } = req.params
  updateStatus(event_id)
    .then(() => {
      return getEvent(event_id)
    })
    .then((status) => {
      res.json(status)
    })
    .catch(console.error)
})

export default router
