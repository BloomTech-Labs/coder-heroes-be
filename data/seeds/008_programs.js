exports.seed = function (knex) {
  return knex('programs').insert([
    {
      program_name: 'Codercamp',
      program_description:
        'Students build their own app based on their own interest',
    },
    {
      program_name: 'Codersitters',
      program_description:
        'Coding through play, coding + babysitting (not just code, also creativity)',
    },
    {
      program_name: 'Coderyoga',
      program_description:
        'Kids learn coding basics through yoga stories and exercise',
    },
  ]);
};
