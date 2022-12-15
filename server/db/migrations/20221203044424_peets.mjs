export const up = (knex) => {
  return knex.schema.createTable('peets', (table) => {
    table.increments('id')
    table.string('petname')
    table.string('owner')
    table.string('image')
  })
}

export const down = (knex) => {
  return knex.schema.dropTable('peets')
}
