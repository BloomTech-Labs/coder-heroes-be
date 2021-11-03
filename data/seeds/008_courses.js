exports.seed = function (knex) {
      return knex('courses').insert([
        {
          size: 8,
          description: 'Computer Science fundamentals.',
          subject: 'CS101',
          prereq: null,
        },
        {
          size: 15,
          description: 'For those who mastered the fundamentals.',
          subject: 'Intermediate JavaScript',
          prereq: 1,
        },
        {
          size: 12,
          description: 'Welcome to Python!',
          subject: 'Intro to Python',
          prereq: null,
        },
      ]);
};
