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
  Children.findById(id)
    .then((child) => {
      if (child && Object.keys(child).length !== 0) {
        //need to return this way because the array will always return something and never not exist
        res.status(200).json(child);
      } else {
        res.status(404).json({ error: 'Student not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', async (req, res) => {
  const child = req.body;
  console.log(child);
  if (child) {
    const id = child.id;
    try {
      await Children.findById(id).then(async (exists) => {
        if (exists.length === 0) {
          await Children.addChildren(child).then((added) =>
            res.status(200).json({
              message: 'Student was created successfully!',
              course: added[0],
            })
          );
        } else {
          res.status(400).json({ message: 'this student already exists' });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(404).json({ message: 'Student Details missing ' });
  }
});

// router.put('/', (req, res) => {
//   console.log('is it secret? is it safe?');
// });

module.exports = router;
