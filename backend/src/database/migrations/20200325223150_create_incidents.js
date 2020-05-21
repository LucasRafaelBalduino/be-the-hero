exports.up = function (knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('nog_id').notNullable();

    table.foreign('nog_id').references('id').inTable('nogs');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('incidents');
};
