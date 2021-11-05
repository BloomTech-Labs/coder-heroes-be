exports.seed = function (knex) {
  return knex('courses').insert([
    {
      size: 8,
      subject: 'CS101',
      description: 'Computer Science fundamentals.',
    },
    {
      size: 15,
      subject: 'Intermediate JavaScript',
      description: 'For those who mastered the fundamentals.',
    },
    {
      size: 12,
      subject: 'Intro to Python',
      description: 'Welcome to Python!',
    },
    {
      size: 1,
      subject: 'Advanced Python',
      description:
        'For students who want to learn more deeply into the Python world.',
    },
  ]);
};
