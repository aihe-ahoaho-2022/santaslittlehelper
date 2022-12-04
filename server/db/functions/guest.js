import connection from '../connection.js'

export function getWishlist(db = connection) {
  return db('guest').select()
}

export function getWishlistById(id, db = connection) {
  return db('guest').select().where('guest_code', id).first()
}

export function createWishlist(wish, db = connection) {
  return db('guest').insert(wish).returning('*')
}

export function updatedWishlist(id, wish, db = connection) {
  return db('guest').where('guest_code', id).update(wish)
}

export function deleteWishlist(id, db = connection) {
  return db('guest').del().where('id', id)
}

export function updateWishlistGifter(assigned, db = connection) {
  const { gifter_id, guest_code, id } = assigned
  return db('guest').where({ guest_code }).update({ gifter_id })
}
