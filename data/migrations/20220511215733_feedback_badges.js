const { transaction } = require("../db-config");

exports.up = function(knex) {
  return knex.schema
    .createTable('feedback_badges', (table) => {
      table.increments('badge_id');
      table.string('name');
      table.string('image');
    })

    .createTable('student_badges', (table) => {
        table.increments('student_badge_id');
        table
        .integer('child_id')
        .unsigned()
        .notNullable()
        .references('child_id')
        .inTable('children')
        .onDelete('CASCADE');
        table
        .integer('badge_id')
        .unsigned()
        .notNullable()
        .references('badge_id')
        .inTable('feedback_badges')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('feedback_badges')
    .dropTableIfExists('student_badges');
};
