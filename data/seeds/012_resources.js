exports.seed = function (knex) {
  return knex('resources').insert([
    {
      il_id: 1,
      resource:
        'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics',
    },
    {
      il_id: 4,
      resource:
        'https://www.tutorialspoint.com/data_structures_algorithms/algorithms_basics.htm',
    },
    {
      il_id: 3,
      resource: 'https://codewizardshq.com/coding-for-kids-free/',
    },
  ]);
};
