exports.up = (knex) => {
  return knex.schema
    .createTable('inboxes', function (table) {
      table.increments('inbox_id');
      table
        .integer('profile_id')
        .unique()
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('CASCADE');
    })

    .createTable('messages', function (table) {
      table.increments('messages_id');
      table.timestamp('sent_at').defaultTo(knex.fn.now());
      table.string('title').notNullable();
      table.boolean('read').defaultTo(false);
      table.text('message').notNullable();
      table
        .integer('sent_by_profile_id')
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('CASCADE');
      table
        .integer('inbox_id')
        .unsigned()
        .notNullable()
        .references('inbox_id')
        .inTable('inboxes')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('messages').dropTableIfExists('inboxes');
};
