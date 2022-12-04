import connection from '../connection.js'

export function createEvent(event, db = connection) {
  const { host_id, invite_id, name, budget, date } = event

  return db('event').insert({
    host_id,
    invite_id,
    event_name: name,
    budget,
    date,
  })
}

export function getEvents(db = connection) {
  return db('event').select()
}

export function getEvent(invite_id, db = connection) {
  return db('event').where('invite_id', invite_id).first()
}

export function getGuestsByEventId(invite_id, db = connection) {
  return db('guest').where('event_id', invite_id).select().returning('*')
}

export function getEventByInviteCode(invite_id, db = connection) {
  return db('event').where('invite_id', invite_id).first()
}

export function updateStatus(invite_id, db = connection) {
  return db('event')
    .where({ invite_id })
    .update({ status: true })
    .returning('*')
}

export function updateStatus(event_id, db = connection) {
  console.log(event_id, 'event id in database')
  return db('event').where('invite_code', event_id).update({ status: true })
}

export function getEventById(event_id, db = connection) {
  return db('event').where({ event_id }).first()
}
