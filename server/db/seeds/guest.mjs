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
    {
      id: 4,
      guest_code: 'A6AD1D3289ACE9A7D57D6F81D9C7741',
      event_id: 3,
      name: 'Boris',
      wishlist: 'a new job',
    },
    {
      id: 5,
      guest_code: 'E9A7DA6AD15D9C774D3289AC7D6F81D',
      event_id: 3,
      name: 'Murry',
      wishlist: 'a new cat',
    },
    {
      id: 6,
      guest_code: '289ACE9A7157D6F81D9C774D3DA6AD1',
      event_id: 3,
      name: 'Mandy',
      wishlist: 'a new dog',
    },
    {
      id: 7,
      guest_code: '1D9C774D39A7DA6AD157D6F8289ACE1',
      event_id: 2,
      name: 'Marty',
      wishlist: 'a new car',
    },
    {
      id: 8,
      guest_code: '7D6F8D3289ACE9A7DA6AD151D9C7741',
      event_id: 2,
      name: 'Jeff',
      wishlist: 'a new house',
    },
    {
      id: 9,
      guest_code: 'A7DA6D9C774D3289ACE9AD157D6F81D',
      event_id: 1,
      name: 'Jenny',
      wishlist: 'a new job',
    },
    {
      id: 10,
      guest_code: '157F81D9C774D3289ACED69A7DA6AD1',
      event_id: 1,
      name: 'Lawrence',
      wishlist: 'a new boss',
    },
    {
      id: 11,
      guest_code: 'D9C774D329A7DA6AD157D6F8189ACE1',
      event_id: 2,
      name: 'Linda',
      wishlist: 'a new husband',
    },
    {
      id: 12,
      guest_code: 'AD157D6F8D3289ACE9A7DA61D9C7741',
      event_id: 2,
      name: 'Liam',
      wishlist: 'a new wife',
    },
  ])
}
