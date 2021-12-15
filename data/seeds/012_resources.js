exports.seed = function (knex) {
  return knex('resources').insert([
    {
      instructor_id: 1,
      resource:
        'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics',
      task: false,
      description: 'Please review these docs!',
    },
    {
      instructor_id: 2,
      resource:
        'https://www.tutorialspoint.com/data_structures_algorithms/algorithms_basics.htm',
      task: false,
      description: "Today's lecture topics.",
    },
    {
      instructor_id: 1,
      resource: 'https://codewizardshq.com/coding-for-kids-free/',
      task: true,
      description: 'Sign up for this program!',
    },
  ]);
};
