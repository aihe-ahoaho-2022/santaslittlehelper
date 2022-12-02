import connection from '../connection.js'

export function createEvent(event, db = connection) {
  console.log('hit create event', event)
  const { host_id, invite_code, name, budget, date } = event

  return db('event').insert({
    host_id,
    invite_code,
    event_name: name,
    budget,
    date,
  })
}

export function getEvents(db = connection) {
  return db('event').select()
}

export function getEvent(event_id, db = connection) {
  return db('event').where('event_id', event_id)
}

export function updateStatus(event_id, db = connection) {
  return db('event').where('event_id', event_id).update({ status: true })
}
