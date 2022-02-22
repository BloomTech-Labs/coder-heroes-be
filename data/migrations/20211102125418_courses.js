exports.up = (knex) => {
  return knex.schema
    .createTable('programs', function (table) {
      table.increments('program_id');
      table.string('program_name').notNullable().unique();
      table.text('program_description').notNullable();
    })

    .createTable('classes', (table) => {
      table.increments('class_id');
      table.string('class_name');
      table.string('class_description');
      table.enu('day_of_week', [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ]);
      table.integer('max_size').notNullable();
      table.integer('number_registered');
      table.integer('min_age');
      table.integer('max_age');

      table
        .integer('instructor_id')
        .unsigned()
        .notNullable()
        .references('instructor_id')
        .inTable('instructors')
        .onDelete('CASCADE');

      table
        .integer('program_id')
        .unsigned()
        .notNullable()
        .references('program_id')
        .inTable('programs')
        .onDelete('CASCADE');
      table.time('start_time').notNullable();
      table.time('end_time').notNullable();
      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
      table.string('location').notNullable();
      table.integer('number_of_sessions');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('classes').dropTableIfExists('programs');
};
