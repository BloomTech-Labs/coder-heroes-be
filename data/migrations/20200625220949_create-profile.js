exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.increments('key');
      table.string('email');
      table.string('name');
      table.string('okta').unique();
      table.integer('type').notNullable();
      table
        .string('avatarUrl')
        .defaultTo('https://i.stack.imgur.com/frlIf.png');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('profiles');
};
