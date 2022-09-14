exports.seed = function (knex) {
  return knex('courses').insert([
    {
      course_name: 'App Building Fundamentals',
      course_description:
        'A month-long course where students with design, build, and deploy an app from beginning to end!',
      days_of_week: ['Monday'],
      max_size: 20,
      enrolled_students: 0,
      min_age: 7,
      max_age: 12,
      instructor_id: 1,
      program_id: 1,
      start_time: '08:00:00',
      end_time: '12:30:00',
      start_date: '04/04/2022',
      end_date: '04/28/2022',
      number_of_sessions: 4,
      difficulty: 'Easy',
      session_type: 'Group',
      syllabus_link: 'https://docs.google.com'
    },
    {
      course_name: 'Mindful Design',
      course_description:
        'Students will learn about creativity and web design basics',
      days_of_week: ['Wednesday', 'Friday'],
      max_size: 12,
      enrolled_students: 0,
      min_age: 6,
      max_age: 10,
      instructor_id: 2,
      program_id: 3,
      start_time: '15:30:00',
      end_time: '17:45:00',
      start_date: '04/04/2022',
      end_date: '04/28/2022',
      number_of_sessions: 8,
      difficulty: 'Medium',
      session_type: '1-on-1',
      syllabus_link: 'https://docs.google.com'
    },
  ]);
};
