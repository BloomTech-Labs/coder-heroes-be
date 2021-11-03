exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('resources')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {
          il_id: 2,
          resource:
            'The Waystone Inn lay in silence, and it was a silence of three parts.',
        },
        {
          il_id: 5,
          resource:
            'The man in black fled across the desert, and the gunslinger followed.',
        },
        {
          il_id: 9,
          resource:
            'We should start back, Gared urged as the woods began to grow dark around them.',
        },
      ]);
    });
};
