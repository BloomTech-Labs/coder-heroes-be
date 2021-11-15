const express = require('express');
const Children = require('./childrenModel');
const router = express.Router();

router.get('/', function (req, res) {
  Children.getChildren()
    .then((child) => {
      res.status(200).json(child);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', function (req, res) {
  const id = req.params.id;
  Children.findByChildId(id)
    .then((child) => {
      if (child && Object.keys(child).length !== 0) {
        //need to return this way because the array will always return something and never not exist
        res.status(200).json(child);
      } else {
        res.status(404).json({ error: 'Child not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id/enrollments', function (req, res) {
  const { id } = req.params;
  Children.getEnrolledCourses(id)
    .then((schedules) => {
      if (schedules) {
        res.status(200).json(schedules);
      } else {
        res.status(404).json({ error: 'ChildSchedulesNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/:id/enrollments', async (req, res) => {
  const course = req.body;
  if (course) {
    const { child_id, schedule_id } = course;
    try {
      await Children.checkEnrolled(child_id, schedule_id).then(
        async (exists) => {
          if (exists.length === 0) {
            await Children.addEnrolledCourse(course).then((added) =>
              res.status(200).json({
                message: 'Student was enrolled!',
                course: added[0],
              })
            );
          } else {
            res
              .status(400)
              .json({ message: 'This child is enrolled in the course.' });
          }
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(404).json({ message: 'Enrollment details missing.' });
  }
});

router.post('/', async (req, res) => {
  const child = req.body;
  if (child) {
    const { user_id } = child;
    try {
      await Children.findByUserId(user_id).then(async (exists) => {
        if (exists.length === 0) {
          await Children.addChild(child).then((added) =>
            res.status(200).json({
              message: 'Student was created successfully!',
              child: added[0],
            })
          );
        } else {
          res.status(400).json({ message: 'This child already exists.' });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(404).json({ message: 'Child Details missing.' });
  }
});

router.put('/', (req, res) => {
  const child = req.body;
  if (child) {
    const { id } = child;
    Children.findByChildId(id)
      .then(
        Children.updateChild(id, child)
          .then((updated) => {
            res.status(200).json({
              message: `Child with id: ${id} updated`,
              child: updated[0],
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update child '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find child '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  try {
    Children.findByChildId(id).then((child) => {
      Children.removeChild(child[0].id).then(() => {
        res.status(200).json({
          message: `Child with id:'${id}' was deleted.`,
          child: child[0],
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete child with ID: ${id}`,
      error: err.message,
    });
  }
});

router.put('/enrollments', (req, res) => {
  const enrollment = req.body;
  if (enrollment) {
    const { id } = enrollment;
    Children.updateEnrollment(id, enrollment)
      .then((updated) => {
        res.status(200).json({
          message: `Enrollment with id: ${id} updated`,
          enrollment: updated[0],
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: `Could not update enrollment '${id}'`,
          error: err.message,
        });
      })

      .catch((err) => {
        res.status(404).json({
          message: `Could not find enrollment '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/enrollments/:id', function (req, res) {
  const { id } = req.params;
  try {
    Children.checkEnrolledExists(id).then((course) => {
      Children.removeCourse(course[0].id).then(() => {
        res.status(200).json({
          message: `Enrolled Course with id:'${id}' was deleted from child_id: ${course[0].child_id}'s' enrollments list.`,
          course: course[0],
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete course with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
