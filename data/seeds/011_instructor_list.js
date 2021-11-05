exports.seed = function (knex) {
  return knex('instructor_list').insert([
    { instructor_id: 1, course_id: 1 },
    { instructor_id: 1, course_id: 2, approved: true, approved_by: 1 },
    { instructor_id: 1, course_id: 3, approved: true, approved_by: 3 },
    { instructor_id: 2, course_id: 2, approved: true, approved_by: 2 },
    { instructor_id: 3, course_id: 3, approved: true, approved_by: 1 },
    { instructor_id: 3, course_id: 4, approved: true, approved_by: 1 },
  ]);
};
