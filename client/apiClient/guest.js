import request from 'superagent'
const wishlistURL = '/api/v1/wishlist'

export function getWishlistApi() {
  return request.get(wishlistURL).then((res) => {
    return res.body
  })
}

export function getEventByGuestCodeApi(guest_code) {
  return request.get(`${wishlistURL}/${guest_code}/event`).then((res) => {
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

export async function createGuestApi(newGuest) {
  const res = await request.post('/api/v1/wishlist', newGuest)
  return res.body[0]
}

export function getAssignedWishlist(guest_code) {
  return request.get(`${wishlistURL}/${guest_code}/assigned`).then((res) => {
    return res.body
  })
}

// export const getAssignedWishlist = async (guest_code) => {
//   const res = await request.get(`/api/v1/wishlist/${guest_code}/assigned`)

//   return res.body
// }
