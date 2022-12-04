import request from 'superagent'

const baseUrl = '/api/v1'

export const createEvent = async (event) => {
  const res = await request.post(`${baseUrl}/event`).send(event)

  return res.body
}

export const getEvent = async (event_id) => {
  console.log(event_id)
  const response = await request.get(`${baseUrl}/event/dashboard/${event_id}`)

  return response.body
}

export async function getEvents() {
  const res = await request.get(`${baseUrl}/event/dashboard`)
  return res.body
}

export function getAllParticipants() {
  return request.get('/api/v1/wishlist').then((res) => {
    return res.body
  })
}

export function deleteGuest(guestId) {
  return request.del(`/api/v1/wishlist/${guestId}`).then((res) => {
    return res.body
  })
}

export function updateGuest(guestId, gifter_id) {
  return request
    .patch(`/api/v1/wishlist/${guestId}`)
    .send({ gifter_id })
    .then((res) => {
      return res.body
    })
}

export const updateWishlistGifterApi = async (assignment) => {
  const res = await request
    .put(`${baseUrl}/wishlist/${assignment.guest_code}`)
    .send(assignment)
  return res.body
}

export function updateEventStatus(event_id) {
  console.log('API:', event_id)
  return request
    .patch(`${baseUrl}/event/dashboard/${event_id}`)
    .send()
    .then((res) => {
      return res.body
    })
}

export const getEventByInviteCode = async (invite_id) => {
  const res = await request(`/api/v1/invite/${invite_id}`)
  return res.body
}

export async function updateEventStatus(event_id) {
  const res = await request.patch(`${baseUrl}/event/dashboard/${event_id}`)

  return res.body[0]
}

export async function assignGifter(event_id) {
  const res = await await request.get(
    `${baseUrl}/event/dashboard/${event_id}/assign`
  )
  return res.body
}
