exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('instructor_list')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('instructor_list').insert([
        { instructor_id: 2, course_id: 5 },
        { instructor_id: 6, course_id: 3 },
        { instructor_id: 1, course_id: 2 },
      ]);
    });
};
