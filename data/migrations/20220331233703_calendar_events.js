exports.up = function (knex) {
  return knex.schema.createTable('calendar_events', (table) => {
    table.increments('event_id');
    table.string('date').notNullable();
    table.string('time').notNullable();
    table.string('type').notNullable();
    table.string('content').notNullable();
    table.string('details');
    table
      .integer('profile_id')
      .notNullable()
      .references('profile_id')
      .inTable('profiles')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('calendar_events');
};
