exports.seed = function (knex) {
      return knex('instructor_list').insert([
        { instructor_id: 2, course_id: 4 },
        { instructor_id: 4, course_id: 3 },
        { instructor_id: 1, course_id: 2 },
      ]);
};
