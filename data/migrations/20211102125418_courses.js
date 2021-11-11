exports.up = (knex) => {
  return knex.schema
    .createTable('courses', function (table) {
      table.increments('id');
      table.text('description').notNullable();
      table.string('subject').notNullable().unique();
      table.specificType('prereqs', 'text ARRAY');
    })

    .createTable('schedules', (table) => {
      table.increments('id');
      table.integer('size').notNullable();

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
    })

    .createTable('sessions', (table) => {
      table.increments('id');
      table.time('start_time').notNullable();
      table.time('end_time').notNullable();
      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
      table.string('location').notNullable();

      table
        .integer('schedule_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('schedules')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('sessions')
    .dropTableIfExists('schedules')
    .dropTableIfExists('courses');
};
