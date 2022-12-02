// WISHLIST DATABASE //

import express from 'express'

import * as db from '../db/functions/guest.js'

const router = express.Router()

router.get('/', (req, res) => {
  db.getWishlist()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

//id is 'guest_code' in the 'wishlist' db table
router.get('/:id', (req, res) => {
  const id = req.params.id
  db.getWishlistById(id)
    .then(() => {
      return db.getWishlistById(id)
    })
    // lines 23-25 are not needed
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.err(err)
      res.sendStatus(500)
    })
})

router.post('/', (req, res) => {
  const wish = req.body
  db.createWishlist(wish)
    .then(() => {
      return db.getWishlist()
    })
    .then((updatedWishlist) => {
      res.json(updatedWishlist)
    })
    .catch((err) => console.error(err.message))
})

router.patch('/:id', (req, res) => {
  const id = req.params.id
  const wish = req.body

  db.updatedWishlist(id, wish)
    .then(() => {
      return db.getWishlistById(id)
    })
    .then((wishlist) => {
      res.json(wishlist)
    })
    .catch((err) => {
      console.error(err.message)
      res
        .status(500)
        .json({ message: 'Something went wrong with the patch route' })
    })
})

router.put('/:id', (req, res) => {
  const { gifter_id, guest_code, id } = req.body

  db.updateWishlistGifter(gifter_id, guest_code, id)
    .then(() => {
      return db.getWishlistById(id)
    })
    .then((wishlist) => {
      res.json(wishlist)
    })
    .catch((err) => {
      console.error(err.message)
      res
        .status(500)
        .json({ message: 'Something went wrong with the put route' })
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  db.deleteWishlist(id)
    .then(() => {
      return db.getWishlist()
    })
    .then((guest) => {
      res.json(guest)
    })
    .catch((err) => {
      console.error(err.message)
      res
        .status(500)
        .json({ message: 'Something went wrong with the delete route' })
    })
})

// todo: Create a function here and in db to filter the guests down - don't want on front end for security concerns

export default router
