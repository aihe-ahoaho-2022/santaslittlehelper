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
        {
          id: 4,
          petname: 'Lary',
          owner: 'James',
          image: 'PEET-28.jpg',
        },
        {
          id: 5,
          petname: 'Siren',
          owner: 'Eleanor',
          image: 'PEET-7.jpg',
        },
        {
          id: 6,
          petname: 'Brock',
          owner: 'Eleanor',
          image: 'PEET-24.jpg',
        },
        {
          id: 7,
          petname: 'Chester',
          owner: 'Clint',
          image: 'PEET-11.jpg',
        },
        {
          id: 8,
          petname: 'Roman',
          owner: 'Rachel',
          image: 'PEET-17.jpg',
        },
        {
          id: 9,
          petname: 'Remi',
          owner: 'Mugio',
          image: 'PEET-20.png',
        },
        {
          id: 10,
          petname: 'Sam',
          owner: 'Ben',
          image: 'PEET-27.jpg',
        },

        {
          id: 11,
          petname: 'Penny',
          owner: 'Jessie',
          image: 'PEET-6.jpg',
        },
        {
          id: 12,
          petname: 'Harry',
          owner: 'Jessie',
          image: 'PEET-5.jpg',
        },

        {
          id: 13,
          petname: 'Theo',
          owner: 'Jessie',
          image: 'PEET-8.jpg',
        },
        {
          id: 14,
          petname: 'GingerBreadCat',
          owner: 'Kayla',
          image: 'PEET-9.jpg',
        },
        {
          id: 15,
          petname: 'Nessa',
          owner: 'Krissy',
          image: 'PEET-13.png',
        },
        {
          id: 16,
          petname: 'Queenie',
          owner: 'Ingrid',
          image: 'PEET-14.jpeg',
        },
        {
          id: 17,
          petname: 'Bandid',
          owner: 'Tria',
          image: 'PEET-26.jpg',
        },
        {
          id: 18,
          petname: 'Belly',
          owner: 'Anna',
          image: 'PEET-19.jpg',
        },
        {
          id: 19,
          petname: 'Stormy',
          owner: 'EQ',
          image: 'PEET-21.jpg',
        },
        {
          id: 20,
          petname: 'Sugar',
          owner: 'EQ',
          image: 'PEET-22.jpg',
        },
        {
          id: 21,
          petname: 'Lightning',
          owner: 'Michelle',
          image: 'lightening.png',
        },
      ])
    })
}
