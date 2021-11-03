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
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
      table
        .integer('course_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('courses')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    })

    .createTable('instructor_list', (table) => {
      table.increments('id');
      table.integer('course_id').notNullable();
      table
        .integer('instructor_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('instructors')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    })

    .createTable('resources', (table) => {
      table.increments('id');
      table.string('resource').notNullable();
      table
        .integer('il_id')
        .notNullable()
        .references('id')
        .inTable('instructor_list')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('resources')
    .dropTableIfExists('instructor_list')
    .dropTableIfExists('enrollments');
};
