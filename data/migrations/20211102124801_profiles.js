exports.up = (knex) => {
  return knex.schema

    .createTable('super_admins', function (table) {
      table.increments('super_admin_id');
      table
        .integer('profile_id')
        .unique()
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('CASCADE');
    })

    .createTable('admins', function (table) {
      table.increments('admin_id');
      table
        .integer('profile_id')
        .unique()
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('CASCADE');
    })

    .createTable('parents', function (table) {
      table.increments('parent_id');
      table
        .integer('profile_id')
        .unique()
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('CASCADE');
    })

    .createTable('children', function (table) {
      table.increments('child_id');
      table
        .integer('profile_id')
        .unique()
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('CASCADE');
      table.string('username').notNullable();
      table.integer('age').notNullable();
      table
        .integer('parent_id')
        .unsigned()
        .notNullable()
        .references('parent_id')
        .inTable('parents')
        .onDelete('CASCADE');
    })

    .createTable('instructors', function (table) {
      table.increments('instructor_id');
      table.integer('rating').notNullable();
      table.string('bio').notNullable();
      table
        .integer('profile_id')
        .unique()
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('CASCADE');
      table.string('status').notNullable().defaultTo('pending');
      table
        .integer('approved_by')
        .defaultTo(null)
        .unsigned()
        .references('admin_id')
        .inTable('admins')
        .onDelete('CASCADE');
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('instructors')
    .dropTableIfExists('children')
    .dropTableIfExists('parents')
    .dropTableIfExists('admins')
    .dropTableIfExists('super_admins');
};
