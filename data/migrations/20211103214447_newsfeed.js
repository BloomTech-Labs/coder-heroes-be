exports.up = (knex) => {
  return knex.schema.createTable('newsfeed', function (table) {
    table.increments('id');
    table.string('title').notNullable();
    table.string('link').notNullable();
    table.text('description').notNullable();
    table.timestamp('posted_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('newsfeed');
};
