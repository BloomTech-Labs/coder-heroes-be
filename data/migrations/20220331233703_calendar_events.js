exports.up = function (knex) {
  return knex.schema.createTable('calendar_events', (table) => {
    table.increments('event_id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('calendar_events');
};
