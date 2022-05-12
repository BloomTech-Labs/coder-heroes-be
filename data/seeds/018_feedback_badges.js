exports.seed = function (knex) {
    return knex('feedback_badges').insert([
          {
            name: 'Analytical',
            image: 'analytical',
          },
          {
            name: 'Artsy',
            image: 'artsy',
          },
          {
            name: 'Brave',
            image: 'brave',
          },
          {
            name: 'Coding',
            image: 'coding',
          },
          {
            name: 'Helped',
            image: 'helped',
          },
          {
            name: 'Helpful',
            image: 'helpful',
          },
          {
            name: 'Live',
            image: 'live',
          },
          {
            name: 'Solved',
            image: 'solved',
          },
    ]);
}