export const up = async (knex) => {
  return knex.schema.createTable('guest', (table) => {
    table.increments('id')
    table.string('guest_code')
    table.integer('event_id')
    table.string('name')
    table.string('wishlist')
    table.integer('gifter_id')
  })
}

export const down = async (knex) => {
  return knex.schema.dropTable('guest')
}
