exports.up = (knex) => {
  return knex.schema
    .createTable('inboxes', function (table) {
      table.increments('id');

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('key')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    })

    .createTable('messages', function (table) {
      table.increments('id');
      table.timestamp('sent_at').defaultTo(knex.fn.now());
      table.string('title').notNullable();
      table.boolean('read').defaultTo(false);
      table.text('message').notNullable();2

      table
        .integer('inbox_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('inboxes')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');

      table
        .integer('sender_id')
        .unsigned()
        .notNullable()
        .references('key')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('messages').dropTableIfExists('inboxes');
};
