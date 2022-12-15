export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('guest').del()

  // Inserts seed entries
  await knex('guest').insert([
    {
      id: 0,
      guest_code: '9ACE6AD157D6F81D9C774D39A287DA10',
      event_id: 1,
      name: 'Bruno',
      wishlist: 'gardening tools and soil',
    },
    {
      id: 1,
      guest_code: '57D6F81289ACE6AD1D9C774D39A7DA10',
      event_id: 1,
      name: 'Bob',
      wishlist: 'BBQ and a new lawnmower',
    },
    {
      id: 2,
      guest_code: '1D9C774D326AD157D6F889ACE9A7DA10',
      event_id: 2,
      name: 'Brenda',
      wishlist: 'a new car',
    },
    {
      id: 3,
      guest_code: '6F81E9A7DA6AD157DD9C774D3289AC10',
      event_id: 2,
      name: 'Bella',
      wishlist: 'a new house',
    },
  ])
}
