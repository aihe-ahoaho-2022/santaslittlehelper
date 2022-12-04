import { v4 as uuidv4 } from 'uuid'

import * as db from '../db/functions/guest.js'

export default {
  getWishlist: async (req, res) => {
    try {
      const result = await db.getWishlist()
      res.json(result)
    } catch (err) {
      console.error(err.message)
      res.status(500).json({ message: 'Something went wrong' })
    }
  },
  getWishlistById: async (req, res) => {
    const id = req.params.id

    try {
      const result = await db.getWishlistById(id)

      res.json(result)
    } catch (err) {
      console.err(err)
      res.sendStatus(500)
    }
  },
  createWishlist: async (req, res) => {
    try {
      const wish = req.body
      wish.guest_code = uuidv4()

      const newWishObj = await db.createWishlist(wish)

      res.status(201).json(newWishObj)
    } catch (err) {
      console.error(err.message)
    }
  },
  updatedWishlist: async (req, res) => {
    const id = req.params.id
    const wish = req.body
    try {
      await db.updatedWishlist(id, wish)
      const wishlist = await db.getWishlistById(id)
      res.json(wishlist)
    } catch (err) {
      console.error(err.message)
      res
        .status(500)
        .json({ message: 'Something went wrong with the patch route' })
    }
  },
  updateWishlistGifter: async (req, res) => {
    const { gifter_id, guest_code, id } = req.body
    try {
      await db.updateWishlistGifter(gifter_id, guest_code, id)
      const wishlist = await db.getWishListByGuestCode(id)
      res.json(wishlist)
    } catch (err) {
      console.error(err.message)
      res
        .status(500)
        .json({ message: 'Something went wrong with the put route' })
    }
  },

  deleteWishlist: async (req, res) => {
    const id = req.params.id
    try {
      await db.deleteWishlist(id)
      const guest = await db.getWishlist()
      res.json(guest)
    } catch (err) {
      console.error(err.message)
      res
        .status(500)
        .json({ message: 'Something went wrong with the delete route' })
    }
  },
}
