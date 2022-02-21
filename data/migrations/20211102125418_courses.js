exports.up = (knex) => {
  return knex.schema
    .createTable('course_types', function (table) {
      table.increments('course_type_id');
      table.text('description').notNullable();
      table.string('subject').notNullable().unique();
      table.specificType('prereqs', 'text ARRAY');
    })

    .createTable('classes', (table) => {
      table.increments('class_id');
      table.integer('size').notNullable();
      table.integer('open_seats_remaining');

      table
        .integer('instructor_id')
        .unsigned()
        .notNullable()
        .references('instructor_id')
        .inTable('instructors')
        .onDelete('CASCADE');

      table
        .integer('course_type_id')
        .unsigned()
        .notNullable()
        .references('course_type_id')
        .inTable('course_types')
        .onDelete('CASCADE');
      table.time('start_time').notNullable();
      table.time('end_time').notNullable();
      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
      table.string('location').notNullable();
    })
    .createTable('instructors_course_types', (table) => {
      table.increments('instructors_course_types_id');
      table
        .integer('profile_id')
        .unsigned()
        .notNullable()
        .references('profile_id')
        .inTable('profiles')
        .onDelete('CASCADE');
      table
        .integer('course_type_id')
        .unsigned()
        .notNullable()
        .references('course_type_id')
        .inTable('course_types')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('instructors_course_types')
    .dropTableIfExists('classes')
    .dropTableIfExists('course_types');
};
