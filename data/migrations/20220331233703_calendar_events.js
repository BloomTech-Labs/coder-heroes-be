exports.up = function (knex) {
  return knex.schema.createTable('calendar_events', (table) => {
    table.increments('event_id');
    table.string('date').notNullable();
    table.string('type').notNullable();
    table.string('content').notNullable();
    table.string('details');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('calendar_events');
};
