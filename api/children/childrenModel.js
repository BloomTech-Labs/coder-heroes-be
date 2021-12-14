const db = require('../../data/db-config');

const getChildren = async () => {
  return await db('children');
};

const findByChildId = async (id) => {
  return db('children')
    .leftJoin('profiles', 'child_id', 'profiles.okta_id')
    .where('children.profile_id', id);
};

const checkEnrolled = async (child_id, enrollments_id) => {
  return await db('enrollments')
    .where('child_id', child_id)
    .where('enrollments_id', enrollments_id);
};

const checkEnrolledExists = async (enrollments_id) => {
  return await db('enrollments').where({ enrollments_id });
};

const getEnrolledCourses = async (id) => {
  return await db('children')
    .leftJoin('enrollments', 'children.child_id', 'enrollments.child_id')
    .leftJoin('classes', 'enrollments.class_id', 'schedules.class_id')
    .where('children.profile_id', id);
};

const addEnrolledCourse = async (course) => {
  return await db('enrollments').insert(course).returning('*');
};

const addChild = async (child) => {
  return db('children').insert(child).returning('*');
};

const updateChild = async (child_id, child) => {
  return await db('children').where({ child_id }).update(child).returning('*');
};

const updateEnrollment = async (id, enrollment) => {
  return await db('enrollments')
    .where({ id })
    .update(enrollment)
    .returning('*');
};

const removeChild = async (child_id) => {
  return await db('children').where({ child_id }).del();
};

const removeCourse = async (enrollments_id) => {
  return await db('enrollments').where({ enrollments_id }).del();
};

module.exports = {
  getChildren,
  getEnrolledCourses,
  addEnrolledCourse,
  checkEnrolledExists,
  checkEnrolled,
  findByChildId,
  addChild,
  removeCourse,
  updateChild,
  removeChild,
  updateEnrollment,
};
