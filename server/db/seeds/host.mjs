export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('host').del()

  // Inserts seed entries
  await knex('host').insert([
    { host_id: 1, auth0id: 'fshueisges93942', name: 'Suzanne' },
    { host_id: 2, auth0id: '93943fshueisges', name: 'Bob' },
    { host_id: 3, auth0id: '93943fshueisges', name: 'Sally' },
  ])
}
