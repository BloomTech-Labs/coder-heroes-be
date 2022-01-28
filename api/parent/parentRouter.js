const express = require('express');
const authRequired = require('../middleware/authRequired');
const ownerAuthorization = require('../middleware/ownerAuthorization');
const Parents = require('./parentModel');
const router = express.Router();
const { checkParentObject } = require('./parentMiddleware');

router.get('/', authRequired, function (req, res) {
  Parents.getParents()
    .then((parentList) => {
      res.status(200).json(parentList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:profile_id', authRequired, function (req, res) {
  const id = String(req.params.profile_id);
  Parents.findByParentId(id)
    .then((parent) => {
      if (parent) {
        res.status(200).json(parent);
      } else {
        res.status(404).json({ error: 'parentNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:parent_id/children', authRequired, function (req, res) {
  const id = req.params.parent_id;
  Parents.getParentChildren(id)
    .then((children) => {
      if (children) {
        res.status(200).json(children);
      } else {
        res.status(404).json({ error: 'ParentChildrenNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:parent_id/schedules', authRequired, function (req, res) {
  const id = req.params.parent_id;
  Parents.getChildSchedules(id)
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

router.post('/', checkParentObject, async (req, res) => {
  const { profile_id } = req.body;
  try {
    await Parents.findByParentId(profile_id).then(async (user) => {
      if (user.length === 0) {
        await Parents.addParent({ profile_id }).then((inserted) =>
          res
            .status(200)
            .json({ message: 'Parent added.', parent: inserted[0] })
        );
      } else {
        res.status(400).json({ message: 'Parent already exists.' });
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

router.delete(
  '/:profile_id',
  authRequired,
  ownerAuthorization('params'),
  (req, res) => {
    const profile_id = req.params.profile_id;
    try {
      Parents.findByParentId(profile_id).then((parent) => {
        Parents.removeParent(parent[0].profile_id).then(() => {
          res.status(200).json({
            message: `Parent with id:'${profile_id}' was deleted.`,
            parent: parent[0],
          });
        });
      });
    } catch (err) {
      res.status(500).json({
        message: `Could not delete parent with profile_id: ${profile_id}`,
        error: err.message,
      });
    }
  }
);

module.exports = router;
