const yup = require('yup');
const moment = require('moment');

const courseSchema = yup.object().shape({
  course_name: yup
    .string()
    .typeError('course name needs to be a string')
    .min(1, 'course name must be at least 1 char')
    .trim('whitespace alone is not accepted')
    .required('you must provide a course name'),
  course_description: yup
    .string()
    .typeError('course description must be as string')
    .min(5, 'course description must be at least 5 char')
    .trim('whitespace alone is not accepted')
    .required('you must provide a course description'),
  days_of_week: yup
    .array()
    .typeError('days of week must be submitted as an array')
    .required('days of week are required'),
  max_size: yup
    .number()
    .typeError('max size must be a number')
    .min(1, 'size must be at least 1')
    .required('max size is required'),
  min_age: yup
    .number()
    .typeError('min age must be a number')
    .required('min age is required'),
  max_age: yup
    .number()
    .typeError('max age must be a number')
    .required('max age is required')
    .min(yup.ref('min_age'), 'max age cannot be less than max age'),
  instructor_id: yup.number().typeError('instructor must be an number'),
  program_id: yup.number().typeError('instructor must be an number'),
  start_time: yup
    .string()
    .typeError('start_time must be a string')
    .trim('whitespace alone is not accepted')
    .required('start_time is required'),
  end_time: yup
    .string()
    .typeError('end_time must be a string')
    .trim('whitespace alone is not accepted')
    .required('end_time is required')
    .test(
      'is_greater',
      'end time should be greater than start time',
      function (value) {
        const { start_time } = this.parent;
        return moment(value, 'HH:mm').isAfter(moment(start_time, 'HH:mm'));
      }
    ),
  start_date: yup.date().required('date is required'),
  end_date: yup
    .date()
    .required('date is required')
    .min(yup.ref('start_date'), 'end date cannot before start date'),
  location: yup
    .string()
    .typeError('location needs to be a string')
    .min(2, 'location must be at least 2 chars')
    .trim('whitespace alone is not accepted')
    .required('you must provide a location'),
  number_of_sessions: yup
    .number()
    .typeError('number of sessions must be a number')
    .required('number of sessions is required'),
});

module.exports = {
  courseSchema,
};
