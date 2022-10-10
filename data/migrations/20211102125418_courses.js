exports.up = (knex) => {
  return knex.schema
    .createTable('programs', function (table) {
      table.increments('program_id');
      table.string('program_name').notNullable().unique();
      table.text('program_description').notNullable();
    })

    .createTable('courses', (table) => {
      table.increments('course_id');
      table.string('course_name').notNullable();
      table.string('course_description').notNullable();
      table.date('created_on').defaultTo(knex.fn.now());
      table.specificType('days_of_week', 'text ARRAY');
      table.integer('max_size').notNullable();
      table.integer('enrolled_students').notNullable();
      table.integer('min_age').notNullable();
      table.integer('max_age').notNullable();
      table
        .integer('instructor_id')
        .notNullable()
        .unsigned()
        .notNullable()
        .references('instructor_id')
        .inTable('instructors')
        .onDelete('CASCADE');

      table
        .integer('program_id')
        .notNullable()
        .unsigned()
        .notNullable()
        .references('program_id')
        .inTable('programs')
        .onDelete('CASCADE');
      table.time('start_time').notNullable();
      table.time('end_time').notNullable();
      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
      table.integer('number_of_sessions').notNullable();
      table.string('difficulty').notNullable();
      table.string('session_type').notNullable();
      table.string('syllabus_link');
    })
    .createTable('instructors_program_types', (table) => {
      //programs that instructors have been approved to teach
      table.increments('instructors_program_types_id');
      table
        .integer('instructor_id')
        .notNullable()
        .unsigned()
        .notNullable()
        .references('instructor_id')
        .inTable('instructors')
        .onDelete('CASCADE');
      table
        .integer('program_id')
        .notNullable()
        .unsigned()
        .notNullable()
        .references('program_id')
        .inTable('programs')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .raw('DROP TABLE instructors_program_types CASCADE')
    .raw('DROP TABLE courses CASCADE')
    .raw('DROP TABLE programs CASCADE');
};
