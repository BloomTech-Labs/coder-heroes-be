exports.up = function (knex) {
  return knex.schema
    .createTable('enrollments', (table) => {
      table.increments('enrollments_id');
      table.boolean('completed').defaultTo(false);
      table
        .integer('child_id')
        .unsigned()
        .notNullable()
        .references('child_id')
        .inTable('children')
        .onDelete('CASCADE');
      table
        .integer('class_id')
        .unsigned()
        .notNullable()
        .references('class_id')
        .inTable('classes')
        .onDelete('CASCADE');
    })

    .createTable('resources', (table) => {
      table.increments('resource_id');
      table.string('resource').notNullable();
      table.string('description');
      table.boolean('task').notNullable();

      table
        .integer('instructor_id')
        .notNullable()
        .references('instructor_id')
        .inTable('instructors')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('resources')
    .dropTableIfExists('enrollments');
};
