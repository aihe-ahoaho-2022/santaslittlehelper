import connection from '../connection.js'

export function getWishlist(db = connection) {
  return db('wishlist').select()
}

export function getWishlistById(id, db = connection) {
  return db('wishlist').select().where('guest_code', id)
}

export function createWishlist(wish, db = connection) {
  return db('wishlist').insert(wish)
}

export function updatedWishlist(id, wish, db = connection) {
  return db('wishlist').where('guest_code', id).update(wish)
}

export function deleteWishlist(id, db = connection) {
  return db('wishlist').del().where('id', id)
}
