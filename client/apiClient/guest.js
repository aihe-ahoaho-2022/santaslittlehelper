import request from 'superagent'
const wishlistURL = '/api/v1/wishlist'

export function getWishlistApi() {
  return request.get(wishlistURL).then((res) => {
    return res.body
  })
}

export function getWishlistByIdApi(id) {
  return request.get(`${wishlistURL}/${id}`).then((res) => {
    return res.body
  })
}

export function createWishlistApi(wish) {
  return request
    .post(wishlistURL)
    .send(wish)
    .then((res) => {
      return res.body
    })

    .catch(console.error)
}

export function updatedWishlistApi(id, newWish) {
  return request
    .patch(`${wishlistURL}/${id}`)
    .send(newWish)
    .then((res) => {
      return res.body
    })
}

export function deleteWishlistApi(id) {
  return request.delete(`${wishlistURL}/${id}`).then((res) => {
    return res.body
  })
}

export const createGuestApi = async (newGuest) => {
  const res = await request.post('/api/v1/wishlist', newGuest)

  return res.body[0]
}
