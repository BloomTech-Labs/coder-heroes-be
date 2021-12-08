const db = require('../../data/db-config');

const getSessions = async () => {
  const joinedTabkes = await db('sessions as se')
    .join('schedules as sc', 'se.schedule_id', '=', 'sc.id')
    .join('courses as co', 'co.id', '=', 'sc.course_id')
    .join('instructors as ins', 'sc.instructor_id', '=', 'ins.id')
    .join('profiles as p', 'p.okta', '=', 'ins.user_id');
  const res = [];
  joinedTabkes.forEach((item) => {
    res.push({
      session_id: item.id,
      course_id: item.course_id,
      instructor_id: item.instructor_id,
      instructor_name: item.name,
      instructor_rating: item.rating,
      size: item.size,
      subject: item.subject,
      description: item.description,
      prereqs: item.prereqs,
      start_date: item.start_date,
      end_date: item.end_date,
      start_time: item.start_time,
      end_time: item.end_time,
      location: item.location,
    });
  });
  return res;
};

module.exports = {
  getSessions,
};
