const express = require('express');
const Children = require('./childrenModel');

const {
  roleAuthenticationParent,
} = require('../middleware/roleAuthentication');
const {
  checkChildExist,
  isChildAlreadyEnrolled,
  isChildParent,
  checkChildObject,
} = require('./childrenMiddleware');

const router = express.Router();

router.get('/', function (req, res) {
  Children.getChildren()
    .then((child) => {
      res.status(200).json(child);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post(
  '/',
  roleAuthenticationParent,
  checkChildObject,
  async function (req, res, next) {
    const { profile_id } = req.profile;
    try {
      let child = await Children.addChild(profile_id, req.body);
      res.status(201).json(child);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:child_id', checkChildExist, async function (req, res, next) {
  try {
    res.status(200).json(req.child);
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:child_id',
  roleAuthenticationParent,
  checkChildExist,
  isChildParent,
  async function (req, res, next) {
    const { child_id } = req.params;
    try {
      let [child] = await Children.updateChild(child_id, req.body);
      res.status(200).json(child);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:child_id',
  roleAuthenticationParent,
  checkChildExist,
  isChildParent,
  async function (req, res, next) {
    const { child_id } = req.params;
    try {
      let { name } = await Children.removeChild(child_id);
      res.status(200).json({ name });
    } catch (error) {
      next(error);
    }
  }
);

// req.params has bug, bc ID is not specified... so other funtion won't work properly... investgate further
// middleware for enrollments ready to implement  checkChildExist2, checkIfCourseExist, checkChildAge, checkCourseSize
router.get(
  '/:id/enrollments',
  checkChildExist,
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const enrollments = await Children.getEnrolledCourses(id);
      res.status(200).json(enrollments);
    } catch (error) {
      next(error);
    }
  }
);
// req.params has bug, bc ID is not specified... so other funtion won't work properly... investgate further
// middleware for enrollments ready to implement  checkChildExist2, checkIfCourseExist, checkChildAge, checkCourseSize
router.post(
  '/:id/enrollments',
  checkChildExist,
  isChildAlreadyEnrolled,
  async (req, res) => {
    // the req.body is only course_id  === > {course_id} , it will get modified in isChildAlreadyEnrolled middleware
    const enroll = await Children.addEnrolledCourse(req.wantToEnroll);
    res.status(201).json(enroll);
  }
);

module.exports = router;
