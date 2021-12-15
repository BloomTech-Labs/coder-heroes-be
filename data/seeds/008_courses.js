exports.seed = function (knex) {
  return knex('course_types').insert([
    {
      subject: 'CS101',
      description: 'Computer Science fundamentals.',
    },
    {
      subject: 'JavaScriptA',
      description: 'For those who mastered the fundamentals.',
    },
    {
      subject: 'JavaScriptB',
      description: 'Intermediate JavaScript.',
      prereqs: ['JavaScriptA'],
    },
    {
      subject: 'PythonA',
      description: 'Welcome to Python!',
      prereqs: ['CS101'],
    },
    {
      subject: 'PythonB',
      description: 'Intermediate Python.',
      prereqs: ['PythonA'],
    },
    {
      subject: 'PythonC',
      description:
        'For students who want to dive deeper into the Python world.',
      prereqs: ['PythonA', 'PythonB'],
    },
  ]);
};
