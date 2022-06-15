exports.seed = function (knex) {
  return knex('feedback_badges').insert([
    {
      name: 'Bright Idea!',
      image: 'brightidea',
    },
    {
      name: 'Caring Helper!',
      image: 'caringhelper',
    },
    {
      name: 'Cool Coder!',
      image: 'coolcoder',
    },
    {
      name: 'Daily Champion!',
      image: 'dailychampion',
    },
    {
      name: 'Designer!',
      image: 'designer',
    },
    {
      name: 'Organized!',
      image: 'organized',
    },
    {
      name: 'Personal Growth!',
      image: 'personalgrowth',
    },
    {
      name: 'Team Player!',
      image: 'teamplayer',
    },
  ]);
};
