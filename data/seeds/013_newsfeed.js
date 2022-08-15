exports.seed = function (knex) {/* eslint-disable */
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
        {
            title: 'Robot dog learns to walk in one hour',
            link: 'https://www.sciencedaily.com/releases/2022/07/220718122229.htm',
            description: 'Like a newborn animal, a four-legged robot stumbles around during its first walking attempts. But while a foal or a giraffe needs much longer to master walking, the robot learns to move forward fluently in just one hour. A computer program acts as the artificial presentation of the animal\'s spinal cord, and learns to optimize the robot\'s movement in a short time. The artificial neural network is not yet ideally adjusted at the beginning, but rapidly self-adjusts.'
        },
    ]);
};
