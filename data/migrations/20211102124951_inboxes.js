exports.up = (knex) => {
  return knex.schema
    .createTable('conversations', function (table) {
      table.increments('conversation_id');
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
        .integer('conversation_id')
        .unsigned()
        .notNullable()
        .references('conversation_id')
        .inTable('conversations')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('messages').dropTableIfExists('conversations');
};
