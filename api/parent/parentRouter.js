const express = require('express');
const authRequired = require('../middleware/authRequired');
const Parents = require('./parentModel');
const router = express.Router();

router.get('/', authRequired, function (req, res) {
  Parents.getParents()
    .then((parentlist) => {
      res.status(200).json(parentlist);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', authRequired, function (req, res) {
  const id = String(req.params.id);
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

router.get('/:id/children', authRequired, function (req, res) {
  const id = req.params.id;
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

router.get('/:id/schedules', authRequired, function (req, res) {
  const { id } = req.params;
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

router.post('/', async (req, res) => {
  const parent = req.body;
  if (parent) {
    const { user_id } = parent;
    try {
      await Parents.findByOkta(user_id).then(async (user) => {
        if (user.length === 0) {
          await Parents.addParent(parent).then((inserted) =>
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
  } else {
    res.status(404).json({ message: 'Parent details missing.' });
  }
});

router.put('/', authRequired, (req, res) => {
  const parent = req.body;
  if (parent) {
    const { user_id } = parent;
    Parents.findByOkta(user_id)
      .then(
        Parents.updateParent(user_id, parent)
          .then((updated) => {
            res.status(200).json({
              message: `Parent with id: ${user_id} updated`,
              parent: updated[0],
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update parent '${user_id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find parent '${user_id}'`,
          error: err.message,
        });
      });
  }
});

//admin permissions
router.delete('/:id', authRequired, (req, res) => {
  const id = req.params.id;
  try {
    Parents.findByParentId(id).then((parent) => {
      Parents.removeParent(parent[0].id).then(() => {
        res.status(200).json({
          message: `Parent with id:'${id}' was deleted.`,
          parent: parent[0],
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete parent with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
