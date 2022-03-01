const yup = require('yup');

const programSchema = yup.object().shape({
  program_name: yup
    .string()
    .typeError('program name needs to be a string')
    .min(1, 'program name must be at least 1 char')
    .trim('whitespace alone is not accepted')
    .required('you must provide a program name'),
  program_description: yup
    .string()
    .typeError('program description must be a string')
    .min(5, 'program description must be at least 5 char')
    .trim('whitespace alone is not accepted')
    .required('you must provide a program description'),
});

module.exports = { programSchema };
