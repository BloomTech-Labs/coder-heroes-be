const db = require('../../data/db-config');
const { findOrCreateParent } = require('../parent/parentModel');

const getChildren = async () => {
  return await db('children');
};

const findByChildId = async (child_id) => {
  return db('children')
    .join('profiles', 'children.profile_id', 'profiles.profile_id')
    .where('child_id', child_id)
    .first();
};

const addChild = async (
  parent_profile_id,
  { name, username, age, avatarUrl }
) => {
  let { parent_id } = findOrCreateParent(parent_profile_id);
  let [profile_id] = await db('profiles')
    .insert({
      email: null,
      name,
      okta_id: null,
      role_id: 5,
      avatarUrl,
    })
    .returning('profile_id');
  await db('children').insert({
    profile_id,
    username,
    age,
    parent_id,
  });
  return {
    name,
    profile_id,
    parent_id,
  };
};

const updateChild = async (child_id, changes) => {
  return db('children').update(changes).where({ child_id }).returning('*');
};

const removeChild = async (child_id) => {
  let [child] = await db('children')
    .leftJoin('profiles', 'profiles.profile_id', 'children.profile_id')
    .where('children.child_id', child_id)
    .returning('profiles.name');
  await db('children').del().where({ child_id });
  return child;
};

const getEnrolledCourses = async (child_id) => {
  const enrollments = await db('children')
    .join('enrollments', 'children.child_id', 'enrollments.child_id')
    .join('courses', 'enrollments.course_id', 'courses.course_id')
    .join('instructors', 'instructors.instructor_id', 'courses.instructor_id')
    .join('profiles', 'profiles.profile_id', 'instructors.profile_id')
    .where('children.child_id', child_id)
    .select('enrollments.*', 'courses.*', 'profiles.name as instructor_name');
  const child = await findByChildId(child_id);
  
  return {
    ...child,
    enrollments,
  };
};

const addEnrolledCourse = async (course) => {
  // need to added middleware to the router that checks if the course exists because if it doesn't we get no response back from sever
  await db('enrollments').insert(course);
  return await getEnrolledCourses(course.child_id);
};

module.exports = {
  getEnrolledCourses,
  addEnrolledCourse,
  findByChildId,
  findChildParent,
  addChild,
  getChildren,
  updateChild,
  removeChild,
};
