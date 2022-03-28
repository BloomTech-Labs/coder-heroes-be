exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('roles', function (table) {
      table.increments('role_id');
      table.string('role_name').notNullable().unique();
    })
    .createTable('profiles', function (table) {
      table.increments('profile_id');
      table.string('email');
      table.string('name');
      table.string('okta_id').unique();
      table
        .integer('role_id')
        .notNullable()
        .references('role_id')
        .inTable('roles')
        .onDelete('CASCADE');
      table
        .string('avatarUrl')
        .defaultTo('https://i.stack.imgur.com/frlIf.png');
    });
};

exports.down = (knex) => {
  return knex.schema
    .raw('DROP TABLE profiles CASCADE')
    .raw('DROP TABLE roles CASCADE');
};
