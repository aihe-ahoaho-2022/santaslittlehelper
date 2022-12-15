import express from 'express'

import guestController from '../controllers/guest.js'

const router = express.Router()

router.get('/', guestController.getWishlist)
router.get('/:id', guestController.getWishlistById)
router.get('/:id/event', guestController.getEventById)
router.get('/:guest_code/assigned', guestController.getWishListByGuestCode)
router.post('/', guestController.createWishlist)
router.patch('/:id', guestController.updatedWishlist)
router.put('/:id', guestController.updateWishlistGifter)
router.delete('/:id', guestController.deleteWishlist)

export default router