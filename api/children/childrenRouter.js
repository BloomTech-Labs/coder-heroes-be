const express = require('express');
const Children = require('./childrenModel');
const authRequired = require('../middleware/authRequired');
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

router.get('/', authRequired, function (req, res) {
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
  authRequired,
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

router.get(
  '/:child_id',
  authRequired,
  checkChildExist,
  async function (req, res, next) {
    try {
      res.status(200).json(req.child);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:child_id',
  authRequired,
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
  authRequired,
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

router.get(
  '/:id/enrollments',
  authRequired,
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

router.post(
  '/:id/enrollments',
  authRequired,
  checkChildExist,
  isChildAlreadyEnrolled,
  async (req, res) => {
    // the req.body is only course_id  === > {course_id} , it will get modified in isChildAlreadyEnrolled middleware
    const enroll = await Children.addEnrolledCourse(req.wantToEnroll);
    res.status(201).json(enroll);
  }
);

module.exports = router;
