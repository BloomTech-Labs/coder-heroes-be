const yup = require('yup');
const moment = require('moment');

const classSchema = yup.object().shape({
  class_name: yup
    .string()
    .typeError('class name needs to be a string')
    .min(1, 'class name must be at least 1 char')
    .trim('whitespace alone is not accepted')
    .required('you must provide a class name'),
  class_description: yup
    .string()
    .typeError('class description must be as string')
    .min(5, 'class description must be at least 5 char')
    .trim('whitespace alone is not accepted')
    .required('you must provide a class description'),
  days_of_week: yup
    .array()
    .typeError('days of week must be submitted as an array')
    .required('days of week are required'),
  max_size: yup
    .integer()
    .typeError('max size must be an integer')
    .min(1, 'size must be at least 1')
    .required('max size is required'),
  min_age: yup
    .integer()
    .typeError('min age must be an integer')
    .required('min age is required'),
  max_age: yup
    .integer()
    .typeError('max age must be an integer')
    .required('max age is required')
    .min(yup.ref('min_age'), 'max age cannot be less than max age'),
  instructor_id: yup.integer().typeError('instructor must be an integer'),
  program_id: yup.integer().typeError('instructor must be an integer'),
  start_time: yup
    .string()
    .type('start_time must be a string')
    .trim('whitespace alone is not accepted')
    .required('start_time is required'),
  end_time: yup
    .string()
    .type('end_time must be a string')
    .trim('whitespace alone is not accepted')
    .required('end_time is required')
    .test('is_greater', 'end time should be greater', function (value) {
      const { start_time } = this.parent;
      return moment(value, 'HH:mm').isAfter(moment(start_time, 'HH:mm'));
    }),
  start_date: yup
    .date()
    .string()
    .type('date must be a string')
    .trim('whitespace alone is not accepted'),
  end_date: yup
    .date()
    .string()
    .type('date must be a string')
    .trim('whitespace alone is not accepted')
    .min(yup.ref('start_date'), 'end date cannot before start date'),
  location: yup
    .string()
    .typeError('location needs to be a string')
    .min(2, 'location must be at least 2 chars')
    .trim('whitespace alone is not accepted')
    .required('you must provide a location'),
  number_of_sessions: yup
    .integer()
    .typeError('number of sessions must be an integer')
    .required('number of sessions is required'),
});

module.exports = {
  classSchema,
};
