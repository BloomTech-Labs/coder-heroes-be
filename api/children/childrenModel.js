const db = require('../../data/db-config');

const getChildren = async () => {
  return await db('children');
};

const findByChildId = async (child_id) => {
  return db('children').where({ child_id });
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
  let { parent_id } = await db('parents')
    .where('profile_id', parent_profile_id)
    .first();
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

const getEnrolledCourses = async (id) => {
  // receives error if the id of the course doesn't exist exist  this have to modified later on we need to make a middleware that checks fot the existing courses then runs this model'
  const enrollments = await db('children')
    .join('enrollments', 'children.child_id', 'enrollments.child_id')
    .join('courses', 'enrollments.course_id', 'courses.course_id')
    .where('children.child_id', id);

  const enrolledCourses = {
    profile_id: enrollments[0].profile_id,
    username: enrollments[0].username,
    age: enrollments[0].age,
    parent_id: enrollments[0].parent_id,
    enrolled_courses: enrollments.map((x) => {
      const container = {};
      container.course_id = x.course_id;
      container.completed = x.completed;
      container.course_size = x.size;
      container.open_seats_remaining = x.open_seats_remaining;
      container.instructor_id = x.instructor_id;
      container.course_type_id = x.course_type_id;
      container.start_time = x.start_time;
      container.end_time = x.end_time;
      container.start_date = x.start_date;
      container.end_date = x.end_date;
      container.location = x.location;
      return container;
    }),
  };
  return enrolledCourses;
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
