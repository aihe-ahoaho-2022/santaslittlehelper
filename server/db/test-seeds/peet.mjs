export const seed = (knex) => {
  return knex('peets')
    .del()
    .then(function () {
      return knex('peets').insert([
        {
          id: 1,
          petname: 'Croissant',
          owner: 'Rohan',
          image: 'PEET-18.jpg',
        },
        {
          id: 2,
          petname: 'Frank',
          owner: 'Ben',
          image: 'PEET-12.jpg',
        },
        {
          id: 3,
          petname: 'George',
          owner: 'James',
          image: 'PEET-29.jpg',
        },
      ])
    })
}
