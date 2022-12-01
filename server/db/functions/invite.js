import connection from '../connection.js'

export function getWishlist(db = connection) {
  return db('wishlist').select()
}
