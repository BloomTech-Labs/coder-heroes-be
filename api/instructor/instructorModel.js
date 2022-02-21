const db = require('../../data/db-config');

const findInstructorCourses = async (profile_id) => {
  return db('instructors')
    .leftJoin(
      'classes',
      'instructors.instructor_id',
      '=',
      'classes.instructor_id'
    )
    .where('instructors.profile_id', profile_id);
};

module.exports = {
  findInstructorCourses,
};
