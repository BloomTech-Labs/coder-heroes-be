exports.seed = function (knex) {
  return knex('newsfeed').insert([
    {
      title: 'Check out these coding camps!',
      link: 'https://www.idtech.com/',
      description: 'This is great way to learn more about the coding world!',
    },
    {
      title: 'Always check the docs!',
      link: 'https://developer.mozilla.org/en-US/',
      description:
        'Make sure to check the documentations if you are looking for a method to use and are not sure what the precise name is!',
    },
    {
      title: 'Practice your algorithms!',
      link: 'https://leetcode.com/',
      description: 'Sign up and test your problem-solving skills!',
    },
  ]);
};
