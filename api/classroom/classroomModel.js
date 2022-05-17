const db = require('../../data/db-config');

const getStudentsByClassId = async (course_id) => {
  return await db('children as c')
    .select('c.*', 'co.course_name')
    .leftJoin('enrollments as e', 'c.child_id', 'e.child_id')
    .leftJoin('courses as co', 'co.course_id', 'e.course_id')
    .where('co.course_id', course_id);
};

const getBadges = async () => {
  return await db('feedback_badges');
};

const getBadgesByChildId = async (child_id) => {
  return await db('feedback_badges as fb')
    .select('fb.*', 'c.username')
    .leftJoin('student_badges as sb', 'sb.badge_id', 'fb.badge_id')
    .leftJoin('children as c', 'sb.child_id', 'c.child_id')
    .where('sb.child_id', child_id);
};

// pair needs to be an object with badge_id and child_id
const assignBadgeByIds = async (pair) => {
  return await db('student_badges')
    .returning(['badge_id', 'child_id'])
    .insert(pair);
};

module.exports = {
  getStudentsByClassId,
  getBadges,
  getBadgesByChildId,
  assignBadgeByIds,
};
