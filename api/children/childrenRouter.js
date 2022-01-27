const express = require('express');
const Children = require('./childrenModel');
const authRequired = require('../middleware/authRequired');
const {
  checkChildExist,
  isChildAlreadyEnrolled,
  checkChildObject,
} = require('./childrenMiddleware');

const router = express.Router();

//dont forget authRequired
router.get('/', authRequired, function (req, res) {
  Children.getChildren()
    .then((child) => {
      res.status(200).json(child);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});
//dont forget authRequired
router.get('/:id', authRequired, checkChildExist, async function (
  req,
  res,
  next
) {
  try {
    res.status(200).json(req.child);
  } catch (error) {
    next(error);
  }
});

router.post('/', authRequired, checkChildObject, async function (
  req,
  res,
  next
) {
  const { profile_id } = req.body;
  try {
    await Children.findByChildId(profile_id).then(async (user) => {
      if (user.length === 0) {
        await Children.addChild({ profile_id }).then((inserted) =>
          res.status(200).json({ message: 'Child added.', parent: inserted[0] })
        );
      } else {
        res.status(400).json({ message: 'Child already exists.' });
      }
    });
  } catch (error) {
    next(error);
  }
});

//dont forget authRequired
router.get('/:id/enrollments', authRequired, checkChildExist, async function (
  req,
  res,
  next
) {
  try {
    const { id } = req.params;
    const enrollments = await Children.getEnrolledCourses(id);
    res.status(200).json(enrollments);
  } catch (error) {
    next(error);
  }
});
//dont forget authRequired
router.post(
  '/:id/enrollments',
  authRequired,
  checkChildExist,
  isChildAlreadyEnrolled,
  async (req, res) => {
    // the req.body is only class_id  === > {class_id} , it will get modified in isChildAlreadyEnrolled middleware
    const enroll = await Children.addEnrolledCourse(req.wantToEnroll);
    res.status(201).json(enroll);
  }
);

router.use('*', errorhandler);
//eslint-disable-next-line
function errorhandler(err, req, res, next) {
  res.status(err.status || 500).json(err.message);
}

module.exports = router;
