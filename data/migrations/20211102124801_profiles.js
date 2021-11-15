exports.up = (knex) => {
  return knex.schema
    .createTable('admins', function (table) {
      table.increments('id');

      table
        .string('user_id')
        .unsigned()
        .notNullable()
        .references('okta')
        .inTable('profiles')
        .onDelete('CASCADE');
    })

    .createTable('parents', function (table) {
      table.increments('id');

      table
        .string('user_id')
        .unsigned()
        .notNullable()
        .references('okta')
        .inTable('profiles')
        .onDelete('CASCADE');
    })

    .createTable('children', function (table) {
      table.increments('id');
      table.string('username').notNullable();
      table.integer('age').notNullable();

      table
        .integer('parent_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('parents')
        .onDelete('CASCADE');

      table
        .string('user_id')
        .unsigned()
        .notNullable()
        .references('okta')
        .inTable('profiles')
        .onDelete('CASCADE');
    })

    .createTable('instructors', function (table) {
      table.increments('id');
      table.integer('rating').notNullable();
      table.string('bio').notNullable();

      table
        .string('user_id')
        .unsigned()
        .notNullable()
        .references('okta')
        .inTable('profiles')
        .onDelete('CASCADE');
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('instructors')
    .dropTableIfExists('children')
    .dropTableIfExists('parents')
    .dropTableIfExists('admins');
};
