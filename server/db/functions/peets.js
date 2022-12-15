import connection from '../connection.js'

export function getPeets(db = connection) {
  return db('peets').select()
}

export function addPeets(petname, owner, image, db = connection) {
  return db('peets').insert({
    petname: petname,
    owner: owner,
    image: image,
  })
}
