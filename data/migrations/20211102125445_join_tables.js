exports.up = function (knex) {
  return knex.schema
    .createTable('enrollments', (table) => {
      table.increments('id');
      table.integer('child_id').notNullable();
      table.integer('course_id').notNullable();
      table.boolean('completed').defaultTo(false);
    })

    .createTable('instructor_list', (table) => {
      table.increments('id');
      table.integer('instructor_id').notNullable();
      table.integer('course_id').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('instructor_list')
    .dropTableIfExists('enrollments');
};
