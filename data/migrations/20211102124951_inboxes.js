exports.up = (knex) => {
  return knex.schema
    .createTable('inboxes', function (table) {
      table.increments('id');

      table
        .string('user_id')
        .unsigned()
        .notNullable()
        .references('okta')
        .inTable('profiles')
        .onDelete('CASCADE');
    })

    .createTable('messages', function (table) {
      table.increments('id');
      table.timestamp('sent_at').defaultTo(knex.fn.now());
      table.string('title').notNullable();
      table.boolean('read').defaultTo(false);
      table.text('message').notNullable();
      table.text('sent_by').notNullable();

      table
        .integer('inbox_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('inboxes')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('messages').dropTableIfExists('inboxes');
};
