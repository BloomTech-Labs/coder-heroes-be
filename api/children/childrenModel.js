const db = require('../../data/db-config');
const { findOrCreateParent } = require('../parent/parentModel');

const getChildren = async () => {
  return await db('children');
};

const findByChildId = async (child_id) => {
  return db('children').where({ child_id }).first();
};

const findChildParent = async (child_id) => {
  return db('children')
    .leftJoin('parents', 'parents.parent_id', 'children.parent_id')
    .where('children.child_id', child_id)
    .returning('parents.profile_id');
};

const addChild = async (
  parent_profile_id,
  { name, username, age, avatarUrl }
) => {
  let { parent_id } = await findOrCreateParent(parent_profile_id);
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
  // receives error if the id of the course doesn't exist exist  this have to modified later on we need to make a middleware that checks fot the existing courses then runs this model'
  const enrollments = await db('children')
    .join('enrollments', 'children.child_id', 'enrollments.child_id')
    .join('courses', 'enrollments.course_id', 'courses.course_id')
    .join('instructors', 'instructors.instructor_id', 'courses.instructor_id')
    .join('profiles', 'profiles.profile_id', 'instructors.profile_id')
    .where('children.child_id', child_id)
    .select('courses.*', 'enrollments.*', 'profiles.name as instructor_name');
  let child = await findByChildId(child_id);
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
