4
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  await knex('event').del()

  await knex('event').insert([
    {
      event_id: 1,
      host_id: 1,
      invite_id: '57D6F81',
      event_name: 'Trade Me Christmas Party',
      budget: 30,
      date: '19-12-2022',
      status: false,
    },
    {
      event_id: 2,
      host_id: 2,
      invite_id: '8157D6F',
      event_name: 'Bobs Shoe Emporium Christmas Party',
      budget: 50,
      date: '19-12-2022',
      status: false,
    },
    {
      event_id: 3,
      host_id: 3,
      invite_id: 'F81D9C7',
      event_name: 'Sallys Paper Hat Factory Christmas Party',
      budget: 20,
      date: '19-12-2022',
      status: false,
    },
  ])
}
