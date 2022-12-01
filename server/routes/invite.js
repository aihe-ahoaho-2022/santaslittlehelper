import express from 'express'
const router = express.Router()
import * as db from '../db/functions/invite.js'

//APICLIENT: GET /api/invite/:invite_code

// event name and budget and date
// GET /:invite_code
router.get('/:invite_code', (req, res) => {
  db.getWishlist()
    .then((wishlistData) => {
      res.json(wishlistData)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).json({
        message: 'Something went wrong',
      })
    })
})

// POST /api/v1/guests  { invite_code: xxx }

export default router
