exports.up = function (knex) {
  return knex.schema
    .createTable('enrollments', (table) => {
      table.increments('id');
      table.boolean('completed').defaultTo(false);

      table
        .integer('child_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('children')
        .onDelete('CASCADE');

      table
        .integer('schedule_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('schedules')
        .onDelete('CASCADE');
    })

    .createTable('instructor_list', (table) => {
      table.increments('id');
      table.boolean('approved').defaultTo(false);

      table
        .integer('instructor_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('instructors')
        .onDelete('CASCADE');

      table
        .integer('course_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('courses')
        .onDelete('CASCADE');

      table
        .integer('approved_by')
        .defaultTo(null)
        .unsigned()
        .references('id')
        .inTable('admins')
        .onDelete('CASCADE');
    })

    .createTable('resources', (table) => {
      table.increments('id');
      table.string('resource').notNullable();
      table.string('description');
      table.boolean('task').notNullable();

      table
        .integer('il_id')
        .notNullable()
        .references('id')
        .inTable('instructor_list')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('resources')
    .dropTableIfExists('instructor_list')
    .dropTableIfExists('enrollments');
};
