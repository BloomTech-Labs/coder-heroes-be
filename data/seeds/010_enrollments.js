exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('enrollments')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('enrollments').insert([
        { child_id: 12, course_id: 3, completed: false },
        { child_id: 5, course_id: 10, completed: true },
        { child_id: 3, course_id: 4, completed: true },
      ]);
    });
};
