
exports.seed = function (knex) {
  return knex('instructors-course_types').insert([
    {
      profile_id: 1,
      course_type_id: 1,
    },
    {
      profile_id: 1,
      course_type_id: 2,
    },
    {
      profile_id: 1,
      course_type_id: 3,
    },
    {
      profile_id: 1,
      course_type_id: 4,
    },
    {
      profile_id: 1,
      course_type_id: 5,
    },
    {
      profile_id: 1,
      course_type_id: 6,
    },
    {
      profile_id: 6,
      course_type_id: 1,
    },
    {
      profile_id: 6,
      course_type_id: 2,
    },
    {
      profile_id: 6,
      course_type_id: 3,
    },
    {
      profile_id: 6,
      course_type_id: 4,
    },
    {
      profile_id: 6,
      course_type_id: 5,
    },
    {
      profile_id: 6,
      course_type_id: 6,
    },
    {
      profile_id: 3,
      course_type_id: 1,
    },
    {
      profile_id: 3,
      course_type_id: 2,
    },
    {
      profile_id: 3,
      course_type_id: 3,
    },
    {
      profile_id: 3,
      course_type_id: 4,
    },
    {
      profile_id: 8,
      course_type_id: 1,
    },
    {
      profile_id: 8,
      course_type_id: 5,
    },
    {
      profile_id: 8,
      course_type_id: 6,
    },
    {
      profile_id: 8,
      course_type_id: 7,
    },{
      profile_id: 2,
      course_type_id: 1,
    },
    {
      profile_id: 2,
      course_type_id: 2,
    },
    {
      profile_id: 2,
      course_type_id: 3,
    },
    {
      profile_id: 2,
      course_type_id: 4,
    },
    {
      profile_id: 2,
      course_type_id: 5,
    },
    {
      profile_id: 2,
      course_type_id: 6,
    },
    {
      profile_id: 7,
      course_type_id: 1,
    },
    {
      profile_id: 7,
      course_type_id: 2,
    },
    {
      profile_id: 7,
      course_type_id: 3,
    },
    {
      profile_id: 7,
      course_type_id: 4,
    },
    {
      profile_id: 7,
      course_type_id: 5,
    },
    {
      profile_id: 7,
      course_type_id: 6,
    },
  ]);
};

