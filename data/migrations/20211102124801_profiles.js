exports.up = (knex) => {
  return knex.schema
    .createTable('parents', function (table) {
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

    .createTable('children', function (table) {
      table.increments('id');
      table.string('username').notNullable();
      table.string('age').notNullable();

      table
        .integer('parent_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('parents')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('key')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    })

    .createTable('instructors', function (table) {
      table.increments('id');
      table.string('rating').notNullable();
      table.string('bio').notNullable();
      table.boolean('approved').defaultTo(false);

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('key')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');

      table
        .integer('approved_by')
        .unsigned()
        .notNullable()
        .references('key')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    })

    .createTable('admins', function (table) {
      table.increments('id');

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('key')
        .inTable('profiles')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('children')
    .dropTableIfExists('parents')
    .dropTableIfExists('instructors')
    .dropTableIfExists('admins');
};
