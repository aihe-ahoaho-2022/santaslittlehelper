import express from 'express'
const router = express.Router()
import * as db from '../db/functions/invite.js'
//import { getWishlist } from '../db/functions/invite'

// event name and budget and date
// GET /:invite_code
router.get('/:invite_code', (req, res) => {
  //const { invite_code } = req.params
  // const invite = getWishlist(invite_code)
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

//router.post
// using db to create new wishlist (posts guest_code and name) - checkout pages/CreateEvent.js
// POST /:invite_code

// GET /api/v1/invite/:invite_code
// POST /api/v1/guests  { invite_code: xxx }

export default router
